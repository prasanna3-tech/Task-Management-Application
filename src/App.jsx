import './App.css';
import { useState } from "react";
import AuthScreen from "./AuthScreen";
import BoardScreen from "./BoardScreen";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

//console.log(showCreateBoardModal);
//console.log(createBoardData);
//console.log(boards)
//console.log(showBoardMenu)
console.log(editBoardData);

return (
    <>
        {!isAuthenticated ? (

      <AuthScreen
    setIsAuthenticated={setIsAuthenticated}
/>

        ) : (

          <BoardScreen

    boards={boards}
    selectedBoard={selectedBoard}
    selectedBoardId={selectedBoardId}
    setSelectedBoardId={setSelectedBoardId}

    showSwitchBoardsModal={showSwitchBoardsModal}
    setShowSwitchBoardsModal={setShowSwitchBoardsModal}

    showCreateBoardModal={showCreateBoardModal}
    setShowCreateBoardModal={setShowCreateBoardModal}

    showDeleteBoardModal={showDeleteBoardModal}
    setShowDeleteBoardModal={setShowDeleteBoardModal}

    showEditBoardModal={showEditBoardModal}
    setShowEditBoardModal={setShowEditBoardModal}

    showBoardMenu={showBoardMenu}
    setShowBoardMenu={setShowBoardMenu}

    createBoardData={createBoardData}
    setCreateBoardData={setCreateBoardData}

    editBoardData={editBoardData}
    setEditBoardData={setEditBoardData}

    boardNameError={boardNameError}
    setBoardNameError={setBoardNameError}

    editBoardNameError={editBoardNameError}
    setEditBoardNameError={setEditBoardNameError}

    deleteBoardError={deleteBoardError}
    setDeleteBoardError={setDeleteBoardError}

    handleCreateBoard={handleCreateBoard}
    handleCreateBoardCancel={handleCreateBoardCancel}
    handleEditBoardSave={handleEditBoardSave}
    handleDeleteBoard={handleDeleteBoard}
/>

        )}
    </>
);

}

export default App;
