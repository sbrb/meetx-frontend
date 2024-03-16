// import React, { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer
// import 'react-toastify/dist/ReactToastify.css';

// function EarlySubmit() {
//     const [showModal, setShowModal] = useState(false);

//     const formik = useFormik({
//         initialValues: {
//             fullName: "",
//             email: "",
//             mobile: "",
//             dob: "",
//             gender: "",
//         },
//         validationSchema: Yup.object({
//             fullName: Yup.string().required('Full Name is required'),
//             email: Yup.string().email('Invalid email address').required('Email is required'),
//             mobile: Yup.string().required('Mobile Number is required'),
//             dob: Yup.date().required('Date of Birth is required'),
//             gender: Yup.string().required('Gender is required'),
//         }),
//         onSubmit: async (values, { resetForm }) => {
//             try {
//                 const response = await submitForm(values);
//                 console.log(response);
//                 if (response.success) {
//                     resetForm();
//                     setShowModal(false);
//                     console.log("Form submitted successfully");
//                 }
//             } catch (error) {
//                 console.error('Error submitting form:', error.message);
//                 if (error.message.includes('Please use other email.') || error.message.includes('Please use other phone number.')) {
//                     toast.error(error.message);
//                 } else {
//                     toast.error('An error occurred while submitting the form');
//                 }
//             }
//         },
//     });

//     const submitForm = async (values) => {
//         try {
//             const response = await fetch("https://meetx-backend.onrender.com/submit", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(values)
//             });

//             if (!response.ok) {
//                 const errorMessage = await response.json();
//                 throw new Error(errorMessage.error || 'Form submission failed');
//             }

//             const data = await response.json();

//             if (response.status === 201) {
//                 return { success: true, data };
//             } else {
//                 throw new Error(data.error);
//             }
//         } catch (error) {
//             throw error;
//         }
//     };


//     return (
//         <div className="app">
//             <ToastContainer position="top-center" />
//             <button className="add-employee-btn" onClick={() => setShowModal(true)}>
//                 Early Submit
//             </button>

//             {showModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close-btn" onClick={() => setShowModal(false)}>
//                             <FaTimes />
//                         </span>
//                         <p className="modal_title">Submit The Form</p>
//                         <br />
//                         <form onSubmit={formik.handleSubmit}>
//                             <input
//                                 type="text"
//                                 name="fullName"
//                                 value={formik.values.fullName}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 placeholder="Enter Full Name"
//                                 className={formik.touched.fullName && formik.errors.fullName ? 'error-input' : ''}
//                             />
//                             {formik.touched.fullName && formik.errors.fullName && (
//                                 <div className="error">{formik.errors.fullName}</div>
//                             )}

//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 placeholder="Enter Email Address"
//                                 className={formik.touched.email && formik.errors.email ? 'error-input' : ''}
//                             />
//                             {formik.touched.email && formik.errors.email && (
//                                 <div className="error">{formik.errors.email}</div>
//                             )}

//                             <input
//                                 type="tel"
//                                 name="mobile"
//                                 value={formik.values.mobile}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 placeholder="Enter Mobile Number"
//                                 className={formik.touched.mobile && formik.errors.mobile ? 'error-input' : ''}
//                             />
//                             {formik.touched.mobile && formik.errors.mobile && (
//                                 <div className="error">{formik.errors.mobile}</div>
//                             )}

//                             <input
//                                 type="date"
//                                 name="dob"
//                                 value={formik.values.dob}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 className={formik.touched.dob && formik.errors.dob ? 'error-input' : ''}
//                             />
//                             {formik.touched.dob && formik.errors.dob && (
//                                 <div className="error">{formik.errors.dob}</div>
//                             )}

//                             <select
//                                 name="gender"
//                                 value={formik.values.gender}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 className={formik.touched.gender && formik.errors.gender ? 'error-input' : ''}
//                             >
//                                 <option value="">Select Gender</option>
//                                 <option value="male">Male</option>
//                                 <option value="female">Female</option>
//                                 <option value="other">Other</option>
//                             </select>
//                             {formik.touched.gender && formik.errors.gender && (
//                                 <div className="error">{formik.errors.gender}</div>
//                             )}

//                             <button type="submit">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default EarlySubmit;







import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EarlySubmit() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasSubmittedForm = localStorage.getItem('formSubmitted');
        if (!hasSubmittedForm) {
            const handleScroll = () => {
                setShowModal(true);
            };
            window.addEventListener('scroll', handleScroll);

            const openModal = () => {
                setShowModal(true);
            };
            const intervalId = setInterval(openModal, 5000);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearInterval(intervalId);
            };
        }
    }, []);

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().matches(/^([a-zA-Z0-9_.]+@[a-z]+\.[a-z]{2,3})?$/, 'Invalid email address').required('Email is required'),
        mobile: Yup.string().matches(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/, 'Invalid phone number').required('Mobile Number is required'),
        dob: Yup.date().required('Date of Birth is required'),
        gender: Yup.string().required('Gender is required'),
    });

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            mobile: "",
            dob: "",
            gender: "",
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await submitForm(values);
                console.log(response);
                if (response.success) {
                    resetForm();
                    setShowModal(false);
                    localStorage.setItem('formSubmitted', true);
                    window.location.reload();
                    console.log("Form submitted successfully");
                }
            } catch (error) {
                console.error('Error submitting form:', error.message);
                if (error.message.includes('Please use other email.') || error.message.includes('Please use other phone number.')) {
                    toast.error(error.message);
                } else {
                    toast.error('An error occurred while submitting the form');
                }
            }
        },
    });

    const submitForm = async (values) => {
        try {
            const response = await fetch("https://meetx-backend.onrender.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.error || 'Form submission failed');
            }

            const data = await response.json();

            if (response.status === 201) {
                return { success: true, data };
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            throw error;
        }
    };


    return (
        <div className="app">
            <ToastContainer position="top-center" />
            <button className="add-employee-btn" onClick={() => setShowModal(true)}>
                Early Submit
            </button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => setShowModal(false)}>
                            <FaTimes />
                        </span>
                        <p className="modal_title">Submit The Form</p>
                        <form onSubmit={formik.handleSubmit}>
                            <input
                                type="text"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Full Name"
                                className={formik.touched.fullName && formik.errors.fullName ? 'error-input' : ''}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <div className="error">{formik.errors.fullName}</div>
                            )}

                            <input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Email Address"
                                className={formik.touched.email && formik.errors.email ? 'error-input' : ''}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error">{formik.errors.email}</div>
                            )}

                            <input
                                type="tel"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter Mobile Number"
                                className={formik.touched.mobile && formik.errors.mobile ? 'error-input' : ''}
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <div className="error">{formik.errors.mobile}</div>
                            )}

                            <input
                                type="date"
                                name="dob"
                                value={formik.values.dob}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.dob && formik.errors.dob ? 'error-input' : ''}
                            />
                            {formik.touched.dob && formik.errors.dob && (
                                <div className="error">{formik.errors.dob}</div>
                            )}

                            <select
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.gender && formik.errors.gender ? 'error-input' : ''}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender && (
                                <div className="error">{formik.errors.gender}</div>
                            )}

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EarlySubmit;
