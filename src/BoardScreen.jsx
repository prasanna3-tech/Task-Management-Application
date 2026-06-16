import { useState } from "react";

import CreateBoardModal from "./components/CreateBoardModal";

function BoardScreen() {

    const [deleteBoardError, setDeleteBoardError] = useState("");

function handleCreateBoard() {

    if (createBoardData.title.trim() === "") {

        setBoardNameError("Board name is required.");

        return;
    }


    const newBoardId = Date.now();


    const newBoard = {
        id: newBoardId,

        title: createBoardData.title,

        description: createBoardData.description,

        background: createBoardData.background
    };


    setBoards([
        ...boards,
        newBoard
    ]);


    setSelectedBoardId(newBoardId);


    setShowCreateBoardModal(false);


    setCreateBoardData({
        title: "",
        description: "",
        background: ""
    });


    setBoardNameError("");

}

function handleCreateBoardCancel() {

    setShowCreateBoardModal(false);

    setCreateBoardData({
        title: "",
        description: "",
        background: ""
    });

    setBoardNameError("");

}

function handleEditBoardSave() {

    if (
        editBoardData.title.trim() === ""
    ) {

        setEditBoardNameError(
            "Board name is required"
        );

        return;
    }

    setBoards(previousBoards =>

    previousBoards.map(board =>

        board.id === selectedBoardId

            ? {

                ...board,

                title: editBoardData.title,

                description:
                    editBoardData.description,

                background:
                    editBoardData.background

            }

            : board

    )

);

setShowEditBoardModal(false);

setEditBoardNameError("");

setEditBoardData({

    title: "",

    description: "",

    background: ""

});

}

function handleDeleteBoard() {

    if (boards.length === 1) {

        setDeleteBoardError(
            "You must have at least one board."
        );

        return;
    }
    const currentBoardIndex = boards.findIndex(

    board =>

        board.id === selectedBoardId

);
let nextSelectedBoard;

if (
    currentBoardIndex < boards.length - 1
) {

    nextSelectedBoard =

        boards[currentBoardIndex + 1];

}
else {

    nextSelectedBoard =

        boards[currentBoardIndex - 1];

}

setBoards(

    previousBoards =>

        previousBoards.filter(

            board =>

                board.id !== selectedBoardId

        )

);

setSelectedBoardId(

    nextSelectedBoard.id

);

setShowDeleteBoardModal(false);

setDeleteBoardError("");

}

const [boards, setBoards] = useState([
    {
        id: 1,
        title: "Project Task Management",
        description: "",
        background: ""
    }
]);
const [showSwitchBoardsModal,
       setShowSwitchBoardsModal] = useState(false);

const [selectedBoardId, setSelectedBoardId] = useState(1);

const selectedBoard = boards.find(
    board => board.id === selectedBoardId
);

const [editBoardData, setEditBoardData] = useState({

    title: "",

    description: "",

    background: ""

});

const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);

const [createBoardData, setCreateBoardData] = useState({

    title: "",
    description: "",
    background: ""

});

const [boardNameError, setBoardNameError] = useState("");

const [editBoardNameError, setEditBoardNameError] = useState("");

const [showBoardMenu, setShowBoardMenu] = useState(false);

const [showEditBoardModal, setShowEditBoardModal] = useState(false);


    return (
        <>


             <div className="board-page">

            <header className="top-nav">

                <div className="logo">
                    Logo
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                />

            <button
                className="create-btn"
                onClick={() => {
                    setShowCreateBoardModal(true);
                }}
                  >
                Create
            </button>

                <button className="notification-btn">
                    🔔
                </button>

                <button className="profile-btn">
                    👤
                </button>

            </header>


        <main className="board-workspace">

            <div className="board-header">

                <h2>
                    {selectedBoard.title}
                </h2>

    <div className="board-menu-wrapper">

            <button
                className="board-menu-btn"

                onClick={() => {

                    setShowBoardMenu(
                        previous => !previous
                    );

                }}
            >
                ⋮
            </button>

            {
    showBoardMenu && (

            <div className="board-menu">

            <button
                    onClick={ () => {

                     setEditBoardData({

                        title: selectedBoard.title,

                        description: selectedBoard.description,

                        background: selectedBoard.background

                    });

                    setShowBoardMenu(false);

                    setShowEditBoardModal(true);

                }}
            >
                Edit Board
            </button>

            <button
                onClick={() => {

                    setShowBoardMenu(false);

                    setShowDeleteBoardModal(true);

                }}
            >
                Delete Board
            </button>

        </div>

    )
}


    </div>

            </div>


<div className="lists-container">

                <div className="list">
                    <h3># List 1</h3>
                </div>

                <div className="list">
                    <h3># List 2</h3>
                </div>

                <button className="add-list-btn">
                    + Add Another List
                </button>

            </div>
            
<div className="switch-board-wrapper">

    <button
                className="switch-board-btn"
            onClick={() => {
            setShowSwitchBoardsModal(true);
        }}
            >
                Switch Boards
    </button>

{
    showSwitchBoardsModal && (

<div className="modal-overlay">

            <div className="switch-modal">

                <h2>
                    Switch Boards
                </h2>

                <input
                type="text"

                placeholder="Search boards..."

                className="board-search-input"
                />

                <h3>
                 Recently Created
                </h3>

    <div className="recent-boards-list">

    {
        boards
            .slice(-10)
            .reverse()
            .map(board => (

                <div
                    key={board.id}

                    className={
                        board.id === selectedBoardId
                            ? "recent-board active-board"
                            : "recent-board"
                    }
                    onClick={() => {

                    setSelectedBoardId(board.id);

                    setShowSwitchBoardsModal(false);

                    }}
                >

                    {
                        board.id === selectedBoardId &&
                        "✓ "
                    }

                    {board.title}

                </div>

            ))
    }

</div>

         <div className="modal-actions switch-modal-actions">

                <button
                    onClick={() => {
                        setShowSwitchBoardsModal(false);
                    }}
                >
                    Cancel
                </button>

        </div>

            </div>

        </div>

    )
}

</div>

    </main>

    {
    showCreateBoardModal && (

        <CreateBoardModal />

    )
}
{
    showEditBoardModal && (

        <div className="modal-overlay">

            <div className="switch-modal">

                <h2>
                    Edit Board
                </h2>

        <div className="form">

                <label>
                    Title
                </label>

                <input
                    type="text"

                    value={
                    editBoardNameError
                        ? editBoardNameError
                        : editBoardData.title
                    }
                    
                    onFocus={() => {

                    setEditBoardNameError("");

                    }}

                    onChange={(e) => {

                        setEditBoardData({

                            ...editBoardData,

                            title: e.target.value

                        });

                    }}
                />

                <label>
                    Description
                </label>

                <input
                    type="text"

                    value={editBoardData.description}

                    onChange={(e) => {

                        setEditBoardData({

                            ...editBoardData,

                            description: e.target.value

                        });

                    }}
                />

                <label>
                    Background
                </label>

                <input
                    type="text"

                    value={editBoardData.background}

                    onChange={(e) => {

                        setEditBoardData({

                            ...editBoardData,

                            background: e.target.value

                        });

                    }}
                />

        </div>

               <div className="modal-actions">

    <button
        onClick={() => {

            setShowEditBoardModal(false);

            setEditBoardNameError("");

        }}
    >
        Cancel
    </button>

    <button
        onClick={handleEditBoardSave}
    >
        Save
    </button>

</div>

            </div>

        </div>

    )
}

{
    showDeleteBoardModal && (

        <div className="modal-overlay">

            <div className="switch-modal">

                <h2>
                    Delete Board
                </h2>

                <p>
                    Delete "
                    {selectedBoard.title}
                    "?
                </p>

                <p>
                    This action cannot be undone.
                </p>

                {
                    deleteBoardError && (

                        <p className="delete-error">

                            {deleteBoardError}

                        </p>

                    )
                }

                <div className="modal-actions">

                    <button
                        onClick={() => {

                            setShowDeleteBoardModal(false);
                            setDeleteBoardError("");

                        }}
                    >
                        Cancel
                    </button>

                <button
                onClick={handleDeleteBoard}
                  >
                Delete
                </button>

                </div>

            </div>

        </div>

    )
}

        </div>  


        </>

    );
}

export default BoardScreen;