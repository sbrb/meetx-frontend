import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReactPaginate from 'react-paginate';

function AdminPanel() {
    const [submissions, setSubmissions] = useState([]);
    const [secretCode, setSecretCode] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 15;
    const passwordInputRef = useRef(null);

    useEffect(() => {
        if (passwordInputRef.current) {
            passwordInputRef.current.focus();
        }
    }, []);


    useEffect(() => {
        if (authenticated) {
            fetchSubmissions();
            const timeout = setTimeout(() => {
                handleLogout();
                toast.info('You have been logged out due to inactivity.', { position: 'top-center' });
            }, 6000000);
            return () => clearTimeout(timeout);
        }
    }, [authenticated]);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get("https://meetx-backend.onrender.com/submissions");
            setSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching submissions:', error.message);
        }
    };

    const handleLogin = () => {
        const actualSecretCode = 'q';

        if (secretCode === actualSecretCode) {
            setAuthenticated(true);
            setSecretCode('');
            toast.success('Login successful!', { position: 'top-center' });
        } else {
            toast.error('Incorrect secret code. Please try again.', { position: 'top-center' });
        }
    };

    const handleFetchData = () => {
        fetchSubmissions();
    };

    const handleLogout = () => {
        setAuthenticated(false);
        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmLogout = () => {
        handleLogout();
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        const headers = [
            'SL No',
            'Full Name',
            'Email',
            'Mobile',
            'Date of Birth',
            'Gender'
        ];

        const data = [headers];
        submissions.forEach((submission, index) => {
            const rowData = [
                index + 1,
                submission.fullName,
                submission.email,
                submission.mobile,
                new Date(submission.dob).toLocaleDateString(),
                submission.gender
            ];
            data.push(rowData);
        });

        doc.autoTable({
            head: [data[0]],
            body: data.slice(1)
        });

        doc.save("submissions.pdf");
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = submissions.slice(offset, offset + perPage);

    return (
        <div className="admin-panel">
            <ToastContainer position="top-center" />
            {!authenticated ? (
                <div className="login-form">
                    <h2>Login</h2>
                    <input
                        type="password"
                        placeholder="Enter secret code"
                        value={secretCode}
                        onChange={(e) => setSecretCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                        ref={passwordInputRef}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div className="admin-panel-holder">
                    <h1 className="admin-panel-title">Admin Panel</h1>
                    <div className="button-container">
                        <button className="fetch-button" onClick={handleFetchData}>Fetch Data</button>
                        <button className="download-button" onClick={handleDownloadPDF}>Download PDF</button>
                        <button className="logout-button" onClick={handleOpenModal}>Logout</button>
                    </div>
                    <table id="submission-table">
                        <thead>
                            <tr>
                                <th>SL No</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((submission, index) => (
                                <tr key={index}>
                                    <td>{offset + index + 1}</td>
                                    <td>{submission.fullName}</td>
                                    <td>{submission.email}</td>
                                    <td>{submission.mobile}</td>
                                    <td>{new Date(submission.dob).toLocaleDateString()}</td>
                                    <td>{submission.gender}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        pageCount={Math.ceil(submissions.length / perPage)}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content logout-modal-content">
                                <h2>Do you want to logout?</h2>
                                <div className="logout-button-container">
                                    <button className="yes-button" onClick={handleConfirmLogout}>Yes</button>
                                    <button className="no-button" onClick={handleCloseModal}>No</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminPanel;
