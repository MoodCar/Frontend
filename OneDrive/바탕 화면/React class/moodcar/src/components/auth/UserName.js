import React from 'react';

const UserName = ({ users }) => {
    return (
        <div>
            {users.map(user => {
                return (
                    <div key={user.providerId}>
                        {user.name}
                    </div>
                );
            })}
            {/* <div>{state.state}</div> */}
        </div>
    );
};

export default UserName;