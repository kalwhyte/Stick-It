import React, { useState, useContext, useEffect, useRef } from "react";
import qs from "qs";
import { v4 as uuidv4 } from "uuid";
import HomeBoard from "../components/boards/HomeBoard";
import ProfilePic from "../components/boards/ProfilePic";
import globalContext from "../context/globalContext";
import useAxiosGet from "../hooks/useAxiosGet";
import useBlurSetState from "../hooks/useBlurSetState";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { authAxios } from "../static/js/util";
import { backendUrl } from "../static/js/const";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import InviteMembersModal from "../components/modals/InviteMembersModal";
import ChangePermissionsModal from "../components/modals/ChangePermissionsModal";
import Error404 from "./Error404";

const defaultImageUrl =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80";

const Project = (props) => {
    /**
     * const { id } = props.match.params;
     * and const { tab } = qs.parse(props.location.search, { ignoreQueryPrefix: true });
     * are destructuring the id and tab values from the props object.
     * These values are extracted from the URL parameters and query string, respectively.
     */
    const { id } = props.match.params;
    const { tab } = qs.parse(props.location.search, {
        ignoreQueryPrefix: true,
    });
    /**
     * const { authUser } = useContext(globalContext);
     * uses the useContext hook to access the authUser object from the globalContext.
     * This object likely contains information about the authenticated user.
     */
    const { authUser } = useContext(globalContext);
     /**
      * const [curTab, setCurTab] = useState(tab || 1);
      * initializes a state variable curTab to manage the currently active tab.
      * It uses the value of tab from the URL's query string or defaults to 1.
      */
    const [curTab, setCurTab] = useState(tab || 1);
    /**
     * const [isEditing, setIsEditing] = useState(false);
     * initializes a state variable isEditing to -
     * manage whether the user is currently editing some information.
     */
    const [isEditing, setIsEditing] = useState(false);
    /**
     * const [isInviting, setIsInviting] = useState(false); initializes a state variable isInviting to manage whether the user is currently inviting new members to the project.
     */
    const [isInviting, setIsInviting] = useState(false);
    /**
     * useBlurSetState(".label-modal", isInviting, setIsInviting); is likely a custom hook (not shown in the provided code) that toggles the isInviting state based on the blur event of elements with the class .label-modal.
     */
    useBlurSetState(".label-modal", isInviting, setIsInviting);
    /**
     * const { data: project, loading, setData: setProject } = useAxiosGet("/projects/${id}/"); uses a custom hook useAxiosGet to fetch project data based on the id extracted from the URL. It also manages the loading state and provides a function setProject to update the project data.
     */
    const { data: project, loading, setData: setProject } = useAxiosGet(
        `/projects/${id}/`
    );
    /**
     * const { data: boards, addItem: addBoard } = useAxiosGet("/boards?project=" + id); similarly uses the useAxiosGet hook to fetch board data related to the project specified by id. It also provides an addBoard function to add new boards to the list.
     */
    const { data: boards, addItem: addBoard } = useAxiosGet(
        "/boards?project=" + id
    );
    /**
     * useDocumentTitle(project ? "${project.title} | Trello" : "");
     * sets the document title to include the project's title if project data is available.
     */
    useDocumentTitle(project ? `${project.title} | Trello` : "");

    // Handle cases when project doesn't exist or user is not a member
    /**
     * The code block starts by checking whether the project data exists
     * and whether it's currently loading.
     * If project doesn't exist and the page is still loading, it returns null.
     * If there's no project and it has finished loading,
     * it renders an Error404 component,
     * indicating that there is no project with the given ID.
     * 
     * If the project exists,
     * the code proceeds to check whether the authenticated user is a member of this project.
     * It does this by searching for the user's membership
     * in the project.members array based on their username.
     * If the user is not found in the project.members,
     * it renders the Error404 component again,
     * indicating that the user is not a member of this project.
     * 
     * If the user is a member of the project,
     * the code continues rendering the main content of the Project component.
     */
    if (!project && loading) return null;
    if (!project && !loading) return <Error404 />; // No project with given id

    // Project exists
    const authUserMembership = project.members.find(
        (member) => member.username === authUser.username
    );
    if (!authUserMembership) return <Error404 />; // Not a member
    const authUserAccessLevel = authUserMembership.access_level;

    return (
        <div className="team">
            <div className="team__header">
                <div className="team__header-content">
                    <div className="team__header-top">
                        <img
                            src={project.image || defaultImageUrl}
                            alt="Team"
                        />
                        {!isEditing ? (
                            <div className="team__profile">
                                <p>{project.title}</p>
                                {authUserAccessLevel === 2 && (
                                    <button
                                        className="btn btn--secondary btn--medium"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <i className="fal fa-pen"></i> Edit
                                        Profile
                                    </button>
                                )}
                            </div>
                        ) : (
                            <EditForm
                                project={project}
                                setProject={setProject}
                                setIsEditing={setIsEditing}
                            />
                        )}
                    </div>
                    <ul className="team__header-bottom">
                        <li
                            className={`team__tab${
                                curTab == 1 ? " team__tab--active" : ""
                            }`}
                            onClick={() => setCurTab(1)}
                        >
                            Boards
                        </li>
                        <li
                            className={`team__tab${
                                curTab == 2 ? " team__tab--active" : ""
                            }`}
                            onClick={() => setCurTab(2)}
                        >
                            Members
                        </li>
                        <li
                            className={`team__tab${
                                curTab == 3 ? " team__tab--active" : ""
                            }`}
                            onClick={() => setCurTab(3)}
                        >
                            Settings
                        </li>
                        <li
                            className={`team__tab${
                                curTab == 4 ? " team__tab--active" : ""
                            }`}
                            onClick={() => setCurTab(4)}
                        >
                            Business Class
                        </li>
                    </ul>
                </div>
            </div>
            <div className="team__body">
                {curTab == 1 && (
                    <div className="team__boards">
                        {(boards || []).map((board) => (
                            <HomeBoard board={board} key={uuidv4()} />
                        ))}
                    </div>
                )}
                {curTab == 2 && (
                    <div className="team__members">
                        <div className="team__members-header">
                            <p>WorkSpace ({project.members.length})</p>
                            {authUserAccessLevel === 2 && (
                                <button
                                    className="btn btn--medium"
                                    onClick={() => setIsInviting(true)}
                                >
                                    <i className="fal fa-user-plus"></i> Invite
                                    To Team
                                </button>
                            )}
                        </div>
                        <ul className="team__members-list">
                            {project.members.map((member) => (
                                <Member
                                    key={uuidv4()}
                                    user={member}
                                    authUser={{
                                        ...authUser,
                                        access_level: authUserAccessLevel,
                                    }}
                                    setProject={setProject}
                                />
                            ))}
                        </ul>
                    </div>
                )}
                {curTab == 3 && (
                    <div className="team__settings">
                        <div className="team__settings-section">
                            <button className="btn btn--secondary btn--medium">
                                Change Visibility
                            </button>
                        </div>
                        <div className="team__settings-section">
                            <button className="btn btn--secondary btn--medium">
                            Change Team
                            </button>
                        </div>
                        {authUserAccessLevel === 2 && (
                            <div className="team__settings-section">
                                <div>
                                    <button className="btn btn--secondary btn--medium" onClick={() =>{
                                        if (window.confirm("Are you sure you want to delete this team?")) {
                                            try {
                                                // Send a PUT request to backend to update project
                                                const { data: resData } = authAxios.delete(
                                                    `${backendUrl}/projects/${project.id}/`
                                                );
                                                setProject(resData);
                                                setIsEditing(false);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                    }}>
                                        Delete Team
                                    </button>
                                </div>
                                <div>
                                    <button className="btn btn--secondary btn--medium" onClick={() => {
                                        if (window.confirm("Are you sure you want to leave this team?")) {
                                            try {
                                                // Send a PUT request to backend to update project
                                                const { data: resData } = authAxios.delete(
                                                    `${backendUrl}/projects/members/${authUser.id}/`
                                                );
                                                setProject(resData);
                                                setIsEditing(false);
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                    }}>
                                        Leave Team
                                    </button>
                                </div>
                                <div>
                                    <button className="btn btn--secondary btn--medium" onClick={() => {
                                        // call addBoard function
                                        addBoard({
                                            title: "New Board",
                                            project: project.id,
                                        });
                                    }}>
                                        New Board
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
            </div>
            {authUserAccessLevel === 2 && isInviting && (
                <InviteMembersModal
                    project={project}
                    setShowModal={setIsInviting}
                />
            )}
        </div>
    );
};

// EditForm component
const EditForm = ({ project, setProject, setIsEditing }) => {
    const { register, setValue, handleSubmit, errors, watch } = useForm();
    const titleValue = watch("title", "");

    useEffect(() => {
        setValue("title", project.title);
        setValue("description", project.description);
    }, [project]);

    const onSubmit = async (data) => {
        try {
            // Send a PUT request to backend to update project
            const { data: resData } = await authAxios.put(
                `${backendUrl}/projects/${project.id}/`,
                data
            );
            setProject(resData);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form className="team__edit-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Name</label>
            <input
                name="title"
                ref={register({ required: true })}
                type="text"
            />

            <label htmlFor="description">Project Description</label>
            <textarea name="description" ref={register}></textarea>

            {titleValue.trim() !== "" ? (
                <button className="btn btn--medium">Save</button>
            ) : (
                <button className="btn btn--medium btn--disabled" disabled>
                    Save
                </button>
            )}
            <button
                className="btn btn--secondary btn--medium"
                onClick={() => setIsEditing(false)}
            >
                Cancel
            </button>
        </form>
    );
};

const Member = ({ user, authUser, setProject }) => {
    const permissionButton = useRef(null);
    const history = useHistory();
    const [isChangingPermission, setIsChangingPermission] = useState(false);

    useBlurSetState(
        ".label-modal",
        isChangingPermission,
        setIsChangingPermission
    );

    const removeMember = async () => {
        try {
            await authAxios.delete(
                backendUrl + `/projects/members/${user.id}/`
            );
            if (authUser.username === user.username) {
                history.push("/");
                return;
            }
            setProject((project) => {
                const updatedMembers = project.members.filter(
                    (member) => member.id !== user.id
                );
                project.members = updatedMembers;
                return { ...project };
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <li className="team__member">
            <ProfilePic user={user} large={true} />
            <div className="team__member-info">
                <p className="team__member-name">{user.full_name}</p>
                <p className="team__member-username">@{user.username}</p>
            </div>
            <div className="team__member-buttons">
                {authUser.access_level === 2 ? (
                    <button
                        className="btn btn--secondary btn--small"
                        ref={permissionButton}
                        onClick={() => setIsChangingPermission(true)}
                    >
                        {user.access_level === 2 ? "Admin" : "Member"}
                    </button>
                ) : (
                    <p>{user.access_level === 2 ? "Admin" : "Member"}</p>
                )}
                {(authUser.username === user.username ||
                    authUser.access_level === 2) && (
                    <button
                        className="btn btn--secondary btn--small"
                        onClick={removeMember}
                    >
                        <i className="fal fa-times"></i>
                        {authUser.username === user.username
                            ? "Leave"
                            : "Remove"}
                    </button>
                )}
            </div>
            {isChangingPermission && (
                <ChangePermissionsModal
                    permissionButton={permissionButton}
                    setShowModal={setIsChangingPermission}
                    member={user}
                    setProject={setProject}
                />
            )}
        </li>
    );
};

export default Project;
