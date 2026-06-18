import { useState } from "react";

function BoardScreen() {



const [deleteBoardError, setDeleteBoardError] = useState("");

const [showAddListForm, setShowAddListForm] =
    useState(false);

const [newListTitle, setNewListTitle] =
    useState("");

const [listNameError, setListNameError] =
    useState("");

const [showListMenu, setShowListMenu] =
    useState(null);

const [editingListId, setEditingListId] =
    useState(null);

const [editListTitle, setEditListTitle] =
    useState("");

const [editListError, setEditListError] =
    useState("");

const [deleteListId, setDeleteListId] =
    useState(null);

const [showAddCardFormId, setShowAddCardFormId] =
    useState(null);

const [cardData, setCardData] = useState({

    title: "",

    description: "",

    dueDate: "",

    urgency: ""

});

const [cardErrors, setCardErrors] = useState({

    title: "",

    urgency: ""

});



function handleAddCard(listId) {


        const errors = {

        title: "",

        urgency: ""

    };

    if (cardData.title.trim() === "") {

        errors.title = "Card name is required";

    }

    if (cardData.urgency === "") {

        errors.urgency = "Select urgency";

    }

    setCardErrors(errors);

    if (

        errors.title !== "" ||

        errors.urgency !== ""

    ) {

        return;

    }

    const newCard = {

        id: Date.now(),

        title: cardData.title,

        description: cardData.description,

        dueDate: cardData.dueDate,

        urgency: cardData.urgency,

        completed: false

    };

    setBoards(

        previousBoards =>

            previousBoards.map(board =>

                board.id === selectedBoardId

                    ? {

                        ...board,

                        lists:

                            board.lists.map(list =>

                                list.id === listId

                                    ? {

                                        ...list,

                                        cards: [

                                            ...list.cards,

                                            newCard

                                        ]

                                    }

                                    : list

                            )

                    }

                    : board

            )

    );

    setCardData({

        title: "",

        description: "",

        dueDate: "",

        urgency: ""

    });

    setShowAddCardFormId(null);

}


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

        background: createBoardData.background,
        lists:[]
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

function handleAddList() {

    if (newListTitle.trim() === "") {

        setListNameError(
            "List title is required"
        );

        return;
    }

    const newList = {

        id: Date.now(),

        title: newListTitle,

        cards: []

    };

    setBoards(

        previousBoards =>

            previousBoards.map(board =>

                board.id === selectedBoardId

                    ? {

                        ...board,

                        lists: [

                            ...board.lists,

                            newList

                        ]

                    }

                    : board

            )

    );

    setNewListTitle("");

    setListNameError("");

    setShowAddListForm(false);

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
        background: "",
        lists :[]
    }
]);
const [showSwitchBoardsModal,
       setShowSwitchBoardsModal] = useState(false);

const [selectedBoardId, setSelectedBoardId] = useState(1);

const selectedBoard = boards.find(
    board => board.id === selectedBoardId
);

//console.log(selectedBoard);

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


function handleEditListSave() {

   if (editListTitle.trim() === "") {

    setEditListError(
        "List title is required"
    );

    return;
}

    setBoards(

        previousBoards =>

            previousBoards.map(board =>

                board.id === selectedBoardId

                    ? {

                        ...board,

                        lists: board.lists.map(list =>

                            list.id === editingListId

                                ? {

                                    ...list,

                                    title: editListTitle

                                }

                                : list

                        )

                    }

                    : board

            )

    );

    setEditingListId(null);

    setEditListTitle("");

}

function handleDeleteList() {

    setBoards(

        previousBoards =>

            previousBoards.map(board =>

                board.id === selectedBoardId

                    ? {

                        ...board,

                        lists:

                            board.lists.filter(

                                currentList =>

                                    currentList.id !== deleteListId

                            )

                    }

                    : board

            )

    );

    setDeleteListId(null);

}

function handleToggleCard(listId, cardId) {

    setBoards(

        previousBoards =>

            previousBoards.map(board =>

                board.id === selectedBoardId

                    ? {

                        ...board,

                        lists: board.lists.map(list =>

                            list.id === listId

                                ? {

                                    ...list,

                                    cards: list.cards.map(card =>

                                        card.id === cardId

                                            ? {

                                                ...card,

                                                completed: !card.completed

                                            }

                                            : card

                                    )

                                }

                                : list

                        )

                    }

                    : board

            )

    );

}



console.log(selectedBoard)
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

    {
selectedBoard.lists.map(list => (

    <div
        key={list.id}
        className="list"
    >

    {
    editingListId === list.id ? (

        <div className="edit-list-header">

            <input
                type="text"

                value={
        editListError
            ? editListError
            : editListTitle
    }

                onChange={(e) => {

                    setEditListTitle(
                        e.target.value
                    );

                }}

                onFocus={() => {

                 setEditListError("");

            }}
            />

             <button
                onClick={handleEditListSave}
             >
                    ✓
            </button>

            <button
                onClick={() => {

                    setEditingListId(null);
                    setEditListTitle("");
                    setEditListError("");

                }}
            >
                ✕
            </button>

        </div>

    ) : (

        <div className="list-header">

        <h3 className="list-title">
            {list.title}
        </h3>

        <div className="list-header-actions">

            <span className="card-count">
                0
            </span>

            <button className="collapse-btn">
                ↔
            </button>

<div className="list-menu-wrapper">

    <button
        className="list-menu-btn"
        
        onClick={() => {

            setShowListMenu(
                showListMenu === list.id
                    ? null
                    : list.id
            );

        }}
    >
       •••
    </button>

    {
        showListMenu === list.id && (

            <div className="list-menu">

                <button
                    onClick={() => {

                        setEditingListId(
                            list.id
                        );

                        setEditListTitle(
                            list.title
                        );

                        setShowListMenu(null);

                    }}
                >
                    Edit List
                </button>

                <button
                        onClick={() => {

                            setDeleteListId(list.id);

                            setShowListMenu(null);

                        }}
                    >
                      Delete List
                </button>

            </div>

        )
    }

            </div>

        </div>

    </div>

    )
}

   

   {
    deleteListId === list.id ? (

        <div className="delete-list-confirmation">

            <p>
                Delete "{list.title}"?
            </p>

            <div className="delete-list-actions">

           <button
                onClick={handleDeleteList}
             >
                Delete
            </button>

                <button
                    onClick={() => {

                        setDeleteListId(null);

                    }}
                >
                    Cancel
                </button>

            </div>

        </div>

    ) : (

        <>

            <div className="list-content">
                 {

        list.cards.map(card => (

        <div className={`card2 ${card.urgency} ${
        card.completed
            ? "completed"
            : ""
    }`}>

    <input
    type="checkbox"

    checked={card.completed}

    onChange={() => {

        handleToggleCard(

            list.id,

            card.id

        );

    }}
/>

    <span className="card-title">

        {card.title}

    </span>

    <button className="card-menu-btn">

        •••

    </button>

</div>

        ))

    }
            </div>

{
    showAddCardFormId === list.id ? (

        <div className="add-card-form">

            <input
                type="text"
                placeholder="Card Name"

                value={
                  cardErrors.title
                    ? cardErrors.title
                    : cardData.title
                }
                
                onFocus={() => {

                    if (cardErrors.title) {

                        setCardErrors({

                            ...cardErrors,

                            title: ""

                        });

                    }

                }}

                onChange={(e) => {

                    setCardData({

                        ...cardData,

                        title: e.target.value

                    });

                }}
            />

        <textarea
            placeholder="Description"
            value={cardData.description}
            onChange={(e) => {

                setCardData({

                    ...cardData,

                    description: e.target.value

                });

            }}
        />

            <input
    type="date"
    value={cardData.dueDate}
    onChange={(e) => {

        setCardData({

            ...cardData,

            dueDate: e.target.value

        });

    }}
/>

           <select
    value={cardData.urgency}
    onChange={(e) => {

        setCardData({

            ...cardData,

            urgency: e.target.value

        });
        
         if (cardErrors.urgency) {

            setCardErrors({

                ...cardErrors,

                urgency: ""

            });

        }



    }}
>

    <option value="">
        Select Urgency
    </option>

    <option value="high">
        High
    </option>

    <option value="medium">
        Medium
    </option>

    <option value="low">
        Low
    </option>

</select>

{
    cardErrors.urgency && (

        <p className="card-error">

            {cardErrors.urgency}

        </p>

    )
}

            <div className="card-form-actions">

            <button
                onClick={() => {

                    handleAddCard(list.id);

                }}
             >
                Add
            </button>

                <button
                    onClick={() => {

                        setShowAddCardFormId(null);
                         setCardData({

                            title: "",

                            description: "",

                            dueDate: "",

                            urgency: ""

                        });

                    }}
                >
                    Cancel
                </button>

            </div>

        </div>

    ) : (

        <button
            className="add-card-btn"
            onClick={() => {

                setShowAddCardFormId(list.id);

            }}
        >
            + Add Card
        </button>

    )
}

        </>

    )
}

</div>
))
               }

               {
    !showAddListForm ? (

        <button
            className="add-list-btn"
            onClick={() => {
                setShowAddListForm(true);
            }}
        >
            + Add Another List
        </button>

    ) : (

    <div className="add-list-form">

    <input
        type="text"
        placeholder="Enter list title..."
        value={
            listNameError
                ? listNameError
                : newListTitle
        }
        onChange={(e) => {
            setNewListTitle(e.target.value);
        }}
        onFocus={() => {
            setListNameError("");
        }}
    />

    <div className="add-list-actions">

        <button
        
        onClick={handleAddList}
        
        >
            Add List
        </button>

        <button
            onClick={() => {

            setShowAddListForm(false);

            setNewListTitle("");

            setListNameError("");

            }}
        >
            Cancel
        </button>

    </div>

</div>
    )
}

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