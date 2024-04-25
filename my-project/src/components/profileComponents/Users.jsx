import React from "react";

const Users = ({ users }) => {
  return (
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src={user.photo}
                    alt="User Avatar"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold text-lg text-zinc-400">
                  {user.name}
                </div>
                <div className="text-sm text-white font-semibold badge badge-md bg-violet-800 border-none">
                  {user.userType}
                </div>
              </div>
            </div>
          </td>
          <td className="text-zinc-400 text-xl">{user.username}</td>
          <td className="text-zinc-400 text-xl">{user.email}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default Users;
