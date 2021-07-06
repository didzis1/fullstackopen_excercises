import React from 'react';

const Header = ({ courseName }: { courseName: string }): JSX.Element => {
    return (
        <div>
            <h1>{courseName}</h1>
        </div>
    )
};

export default Header;