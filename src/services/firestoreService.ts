import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Company, LaunchUpdate } from '../types';
import { INITIAL_COMPANIES, INITIAL_LAUNCHES } from '../data/seedData';

const LAUNCHES_COLLECTION = 'launches';
const COMPANIES_COLLECTION = 'companies';

/**
 * Subscribe to real-time launches from Cloud Firestore
 */
export const subscribeToLaunches = (
  onUpdate: (launches: LaunchUpdate[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const q = query(collection(db, LAUNCHES_COLLECTION));
    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore is brand new/empty, seed initial releases
          onUpdate(INITIAL_LAUNCHES);
        } else {
          const items: LaunchUpdate[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as LaunchUpdate);
          });
          onUpdate(items);
        }
      },
      (err) => {
        console.warn('Firestore subscription warning (using local fallback):', err.message);
        if (onError) onError(err);
      }
    );
  } catch (e: any) {
    console.error('Error in subscribeToLaunches:', e);
    return () => {};
  }
};

/**
 * Subscribe to real-time companies/labs from Cloud Firestore
 */
export const subscribeToCompanies = (
  onUpdate: (companies: Company[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const q = query(collection(db, COMPANIES_COLLECTION));
    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate(INITIAL_COMPANIES);
        } else {
          const items: Company[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as Company);
          });

          // Maintain order prioritizing INITIAL_COMPANIES sequence + custom additions
          const initialMap = new Map(INITIAL_COMPANIES.map((c) => [c.id, c]));
          const custom = items.filter((c) => c.isCustom || !initialMap.has(c.id));
          onUpdate([...INITIAL_COMPANIES, ...custom]);
        }
      },
      (err) => {
        console.warn('Firestore companies subscription warning:', err.message);
        if (onError) onError(err);
      }
    );
  } catch (e: any) {
    console.error('Error in subscribeToCompanies:', e);
    return () => {};
  }
};

/**
 * Create or overwrite a launch document in Firestore
 */
export const saveLaunchToFirestore = async (launch: LaunchUpdate): Promise<void> => {
  const docRef = doc(db, LAUNCHES_COLLECTION, launch.id);
  await setDoc(docRef, launch, { merge: true });
};

/**
 * Delete a launch document from Firestore
 */
export const deleteLaunchFromFirestore = async (launchId: string): Promise<void> => {
  const docRef = doc(db, LAUNCHES_COLLECTION, launchId);
  await deleteDoc(docRef);
};

/**
 * Save a custom company/lab to Firestore
 */
export const saveCompanyToFirestore = async (company: Company): Promise<void> => {
  const docRef = doc(db, COMPANIES_COLLECTION, company.id);
  await setDoc(docRef, company, { merge: true });
};

/**
 * Bulk seed initial default data into Cloud Firestore
 */
export const seedInitialFirestoreData = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);

    INITIAL_COMPANIES.forEach((company) => {
      const docRef = doc(db, COMPANIES_COLLECTION, company.id);
      batch.set(docRef, company, { merge: true });
    });

    INITIAL_LAUNCHES.forEach((launch) => {
      const docRef = doc(db, LAUNCHES_COLLECTION, launch.id);
      batch.set(docRef, launch, { merge: true });
    });

    await batch.commit();
  } catch (e) {
    console.error('Error seeding Firestore data:', e);
    throw e;
  }
};
