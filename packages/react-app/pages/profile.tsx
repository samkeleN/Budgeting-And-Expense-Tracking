import React, { useState } from 'react';

interface ProfileData {
    name: string;
    account: string;
    balance: number;
    target: number;
    spent: number;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData>({
        name: 'Hlela fono',
        account: '0x1234...abcd',
        balance: 500,
        target: 1000,
        spent: 300,
    });
    const [profilePicture, setProfilePicture] = useState<string>('');

    const progress = Math.min((profile.spent / profile.target) * 100, 100);

    const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile">
            <div className="profile-header">
                <div className="profile-picture" onClick={() => document.getElementById('profile-picture-input')?.click()}>
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" />
                    ) : (
                        <span>Click to upload</span>
                    )}
                </div>
                <input
                    id="profile-picture-input"
                    type="file"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                />
                <h1>{profile.name}</h1>
            </div>
            <div className="profile-details">
                <p><strong>Account:</strong> {profile.account}</p>
                <p><strong>Available Balance:</strong> ${profile.balance}</p>
                <p><strong>Total Target:</strong> ${profile.target}</p>
                <p><strong>Total Money Used:</strong> ${profile.spent}</p>
            </div>
            <div className="profile-progress">
                <label htmlFor="progress">Progress towards token:</label>
                <progress id="progress" value={progress} max="100">{progress}%</progress>
            </div>
        </div>
    );
};

export default Profile;
