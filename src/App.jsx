// 1. استدعينا useEffect
import { useState, useEffect } from 'react'
import ExpenseItem from './Components/ExpenseItem'

function App() {
  
  // 2. خطوة الاسترجاع (Loading)
  // بدل ما نبدأ بمصفوفة ثابتة، بنشوف الذاكرة الأول
  const [expenses, setExpenses] = useState(() => {
    // بنحاول نجيب البيانات من المتصفح
    const savedData = localStorage.getItem('my-expenses');
    
    // لو لقينا بيانات بنحولها لـ Array، لو ملقيناش بنرجع مصفوفة فاضية []
    return savedData ? JSON.parse(savedData) : [];
  })

  // 3. خطوة الحفظ (Saving)
  // المراقب: أي تغيير يحصل في expenses، احفظ النسخة الجديدة فوراً
  useEffect(() => {
    localStorage.setItem('my-expenses', JSON.stringify(expenses));
  }, [expenses]);


  // --- باقي الكود كما هو (بدون تغيير) ---
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const addExpense = () => {
    if (!title || !amount) return;
    const newExpense = {
      id: Date.now(),
      title: title,
      amount: Number(amount)
    }
    setExpenses([...expenses, newExpense])
    setTitle('')
    setAmount('')
  }

  const deleteExpense = (id) => {
    const updatedList = expenses.filter(item => item.id !== id);
    setExpenses(updatedList);
  }

  const totalExpenses = expenses.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Expenses
        </h1>

        <div className="bg-green-700 text-white p-2 rounded-lg shadow-md mb-4 text-center">
          <p className="text-sm opacity-100 "> Total</p> 
          <p className="text-2xl font-bold">{totalExpenses} EG</p>
        </div>

        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            placeholder="Item"
            className="border p-2 rounded w-full focus:outline-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Cost"
            className="border p-2 rounded w-24 focus:outline-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button 
            onClick={addExpense}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* 4. هنا استخدمنا الـ Component اللي عملناه المرة اللي فاتت */}
        <div className="space-y-3">
          {expenses.map((item) => (
            <ExpenseItem 
              key={item.id}
              id={item.id}
              title={item.title}
              amount={item.amount}
              onDelete={deleteExpense}
            />
          ))}
          
          {/* رسالة لو مفيش مصاريف */}
          {expenses.length === 0 && <p className="text-center text-gray-400">No expenses yet</p>}
        </div>

      </div>
    </div>
  )
}

export default App