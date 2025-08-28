import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("user");
        setUsers(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Users</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-950 text-white">
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">E-mail</th>
                <th className="px-6 py-3 text-left">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user._id}
                  className={`border-b hover:bg-blue-50 transition ${
                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {user.username}
                  </td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
