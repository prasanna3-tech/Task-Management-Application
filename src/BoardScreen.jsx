import { useState } from "react";

function BoardScreen(

{

    boards,
    selectedBoard,
    selectedBoardId,

    showSwitchBoardsModal,
    setShowSwitchBoardsModal,

    showCreateBoardModal,
    setShowCreateBoardModal,

    showDeleteBoardModal,
    setShowDeleteBoardModal,

    showEditBoardModal,
    setShowEditBoardModal,

    showBoardMenu,
    setShowBoardMenu,

    createBoardData,
    setCreateBoardData,

    editBoardData,
    setEditBoardData,

    boardNameError,
    setBoardNameError,

    editBoardNameError,
    setEditBoardNameError,

    deleteBoardError,
    setDeleteBoardError,

    handleCreateBoard,
    handleCreateBoardCancel,
    handleEditBoardSave,
    handleDeleteBoard,

    setSelectedBoardId

}

) {

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

        <div className="modal-overlay">

            <div className="create-board-modal">

                <h2>Create Board</h2>

                <label>
                    Board Name *
                </label>

                <input
                type="text"

                placeholder="Enter board name"

                value={
                boardNameError
                    ? boardNameError
                    : createBoardData.title
                 }

                 onFocus={() => {

                    if (boardNameError !== "") {
                        setBoardNameError("");
                    }
                }}
                 
                onChange={(e) => {
                    setCreateBoardData({
                        ...createBoardData,
                        title: e.target.value
                    });
                }}
                
                />

                <label>
                    Description
                </label>

                <textarea
                    placeholder="Enter description"
                    value={createBoardData.description}
                    onChange={(e) => {
                        setCreateBoardData({
                            ...createBoardData,
                            description: e.target.value
                        });
                    }}
                />

                <label>
                    Background
                </label>

               <select
                    value={createBoardData.background}
                    onChange={(e) => {
                        setCreateBoardData({
                            ...createBoardData,
                            background: e.target.value
                        });
                    }}
                >
    <option value="">
        Select Background
    </option>

    <option value="Blue">
        Blue
    </option>

    <option value="Green">
        Green
    </option>

    <option value="Purple">
        Purple
    </option>

    <option value="Gray">
        Gray
    </option>
</select>

                <div className="modal-actions">

                    <button
                         onClick={handleCreateBoard}
                    >
                        Create
                    </button>

                   <button
                        onClick={handleCreateBoardCancel}
                    >
                        Cancel
                   </button>

                </div>

            </div>

        </div>

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