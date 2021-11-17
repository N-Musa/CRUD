import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const nameAtom = atom({
  key: "name",
  default: "",
});
const ageAtom = atom({
  key: "age",
  default: 0,
});
const usersAtom = atom({
  key: "users",
  default: [],
});
function App() {
  const [newName, setNewName] = useRecoilState(nameAtom);
  const [newAge, setNewAge] = useRecoilState(ageAtom);
  const [users, setUsers] = useRecoilState(usersAtom);
  const usersRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { age: age + 1 });
  };

  const deleteUser = async (id) => {
    const userdoc = doc(db, "users", id);
    await deleteDoc(userdoc);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getDocs(usersRef);
      setUsers(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchUsers();
  }, []);
  return (
    <div className="p-4 font-Inconsolata flex justify-center flex-col items-center mt-2">
      <div>
        <label className="font-lato text-lg p-4" htmlFor="name">
          Name:
          <input
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            type="text"
            placeholder="Name.."
            className="p-2 border-4 border-indigo-600 mt-2"
          />
        </label>

        <label className="font-lato text-lg p-4" htmlFor="age">
          Age:
          <input
            onChange={(e) => {
              setNewAge(e.target.value);
            }}
            type="number"
            placeholder="Age.."
            className="p-2 border-4 border-indigo-600 mt-2"
          />
        </label>

        <button
          onClick={createUser}
          className="p-2 bg-red-400 rounded-md ml-4 text-white hover:bg-red-800"
        >
          Create User
        </button>
      </div>

      {users.map((user) => (
        <div className=" mt-2 text-2xl p-4">
          Name: {user.name}
          <h2>Age: {user.age}</h2>
          <p>🦙</p>
          <button
            onClick={() => updateUser(user.id, user.age)}
            className="p-1 bg-pink-500 rounded-md m-2 text-white hover:bg-pink-800"
          >
            Age +1
          </button>
          <button
            onClick={() => {
              deleteUser(user.id);
            }}
            className="p-1 bg-green-500 rounded-md m-4 text-white hover:bg-green-800"
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
