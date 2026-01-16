function ExpenseItem(props) {
    return (
        <div className=" flex justify-between items-center bg-gray-50 p-3 rounded border-l-4 border-blue-500 mb-3  ">
            <span className="text-gray-700 font-medium">{props.title}</span>
            <div className="flex items-center gap-3">
                <span className="text-gray-900 font-bold">{props.amount} EG</span>

                <button
                onClick={() => props.onDelete
                    (props.id)}
                className= "text-red-400 hover:text-red-700 font-bold px-2"
                >
                X
                </button>
            </div>
        </div>
    )
}
export default ExpenseItem;