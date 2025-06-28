


import "../../stylesheets/account.css";
import DeleteAccountForm from "../../components/DeleteAccountForm";

export default function Loading() {

  return (
    <div className="account-page">
        <h1>Account</h1>


            <div className="account-page-content">
                <div className="account-info">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu1QBqmHIjMfwB8F2UlnTPVJfQo88pkf3Dhg&s" alt="User Avatar" className="account-avatar" />
                    <p className="account-name"></p>
                </div>

                <div className="account-time">
                </div>

                <div className="account-danger-zone">
                </div>
            </div>

    </div>
  );
}