
// const CreateTeamModal = ({ setShowModal, addProject }) => {
//     useEffect(modalBlurHandler(setShowModal), []);
//     const { register, handleSubmit, errors, watch } = useForm();
//     const titleValue = watch("title", "");

//     const animateFaces = () => {
//         const face1 = document.querySelector(".create-team__face--1");
//         if (titleValue !== "") {
//             face1.style.top = "230px";
//             face1.style.left = "60px";
//         }
//     };

//     const onSubmit = async (data) => {
//         const invitedMembers =
//             data.members !== ""
//                 ? data.members.split(",").map((user) => user.trim()) // usernames and emails
//                 : [];

//         try {
//             const { data: resData } = await authAxios.post(
//                 backendUrl + "/projects/",
//                 data
//             );
//             if (invitedMembers.length !== 0) {
//                 await authAxios.post(
//                     backendUrl + `/projects/${resData.id}/invite/`,
//                     {
//                         users: invitedMembers,
//                     }
//                 );
//             }
//             addProject(resData);
//         } catch (error) {
//             console.log(error);
//         }
//         setShowModal(false);
//     };

//     return (
//         <div className="create-team">
//             <div className="create-team__form">
//                 <p className="create-team__title">🚀 Kickstart Your Project...</p>
//                 <p className="create-team__subtitle">
//                     Take collaboration to the next level by organizing your tasks efficiently.
//                     Create a project, add team members, and streamline your workflow—all in one place!
//                 </p>

//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <label htmlFor="title">What will you call it?</label>
//                     <input
//                         name="title"
//                         ref={register({ required: true })}
//                         type="text"
//                         placeholder="Bash Script"
//                         onBlur={animateFaces}
//                     />

//                     <label htmlFor="description">Project Description</label>
//                     <textarea
//                         name="description"
//                         ref={register}
//                         placeholder="Get your members on board with a few words about your project"
//                     ></textarea>

//                     <label htmlFor="members">Invite Members</label>
//                     <input
//                         name="members"
//                         ref={register}
//                         type="text"
//                         placeholder="Type in username or email"
//                     />

//                     {titleValue.trim() !== "" ? (
//                         <button type="submit" className="btn">
//                             Create Project
//                         </button>
//                     ) : (
//                         <button className="btn btn--disabled" >
//                             🎯 Create Project
//                         </button>
//                     )}
//                 </form>
//             </div>
//             <div className="create-team__bg">
//                 <button onClick={() => setShowModal(false)}>
//                     <i className="fal fa-times"></i>
//                 </button>
//                 <img className="create-team__img" src={board} />
//                 <img
//                     className="create-team__face create-team__face--1"
//                     src={greenface}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CreateTeamModal;


import React, { useEffect } from "react";
import board from "../../static/img/board.svg";
import greenface from "../../static/img/greenface.svg";
import { modalBlurHandler, authAxios } from "../../static/js/util";
import { backendUrl } from "../../static/js/const";
import { useForm } from "react-hook-form";

const CreateTeamModal = ({ setShowModal, addProject }) => {
    useEffect(() => {
        modalBlurHandler(setShowModal);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const titleValue = watch("title", "").trim();

    const animateFaces = () => {
        const face1 = document.querySelector(".create-team__face--1");
        if (titleValue) {
            face1.style.top = "230px";
            face1.style.left = "60px";
        }
    };

    const onSubmit = async (data) => {
        const invitedMembers = data.members
            ? data.members.split(",").map((user) => user.trim())
            : [];

        try {
            const { data: resData } = await authAxios.post(
                `${backendUrl}/projects/`,
                data
            );

            if (invitedMembers.length) {
                await authAxios.post(`${backendUrl}/projects/${resData.id}/invite/`, {
                    users: invitedMembers,
                });
            }
            addProject(resData);
        } catch (error) {
            console.error("Error creating project:", error);
        }
        setShowModal(false);
    };

    return (
        <div className="create-team">
            <div className="create-team__form">
                <h2 className="create-team__title">🚀 Start Your Next Big Idea!</h2>
                <p className="create-team__subtitle">
                    Organize, collaborate, and bring your projects to life seamlessly.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="title">Project Name</label>
                    <input
                        name="title"
                        {...register("title", { required: "Project name is required" })}
                        type="text"
                        placeholder="E.g., Marketing Strategy"
                        onBlur={animateFaces}
                    />
                    {errors.title && <p className="error">{errors.title.message}</p>}

                    <label htmlFor="description">Project Description</label>
                    <textarea
                        name="description"
                        {...register("description")}
                        placeholder="Describe your project in a few words..."
                    ></textarea>

                    <label htmlFor="members">Invite Team Members</label>
                    <input
                        name="members"
                        {...register("members")}
                        type="text"
                        placeholder="Enter emails or usernames, comma-separated"
                    />

                    <button
                        type="submit"
                        className={`btn ${titleValue ? "" : "btn--disabled"}`}
                        disabled={!titleValue}
                    >
                        🎯 Create Project
                    </button>
                </form>
            </div>

            <div className="create-team__bg">
                <button onClick={() => setShowModal(false)} className="close-btn">
                    ✖
                </button>
                <img className="create-team__img" src={board} alt="Project Board" />
                <img
                    className="create-team__face create-team__face--1"
                    src={greenface}
                    alt="Animated Face"
                />
            </div>
        </div>
    );
};

export default CreateTeamModal;