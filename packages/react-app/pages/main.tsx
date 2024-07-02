import React, { useState } from 'react';

interface Budget {
    name: string;
    spent: string | number;
}

const Main: React.FC = () => {
    const [budgets, setBudgets] = useState<Budget[]>([
        { name: 'Entertainment', spent: 100 }
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBudgetName, setNewBudgetName] = useState('');
    const [newBudgetAmount, setNewBudgetAmount] = useState('');

    const addBudget = () => {
        const newBudget: Budget = { name: newBudgetName, spent: newBudgetAmount };
        setBudgets([...budgets, newBudget]);
        setIsModalOpen(false);
        setNewBudgetName('');
        setNewBudgetAmount('');
    };

    const deleteBudget = (index: number) => {
        const newBudgets = budgets.filter((_, i) => i !== index);
        setBudgets(newBudgets);
    };

    const addExpense = () => {
        const newBudget: Budget = { name: newBudgetName, spent: newBudgetAmount };
        setBudgets([...budgets, newBudget]);
        setIsModalOpen(false);
        setNewBudgetName('');
        setNewBudgetAmount('');
    };

    const deleteExpense = (index: number) => {
        const newBudgets = budgets.filter((_, i) => i !== index);
        setBudgets(newBudgets);
    };

    return (
        <div className="main">
            <div className="headerField">
                <h1>Budgets</h1>
                <button className="budgets" onClick={() => setIsModalOpen(true)}>Add Budget</button>
                <button className="expenses" onClick={addExpense}>Add Expense</button>
            </div>

            {budgets.map((budget, index) => (
                <div className="header-container" key={index}>
                    <h1>{budget.name}</h1>
                    <h1>Spent: ${budget.spent}</h1>
                    <button onClick={() => deleteBudget(index)}>X</button>
                </div>
            ))}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Budget</h2>
                        <input
                            type="text"
                            value={newBudgetName}
                            onChange={(e) => setNewBudgetName(e.target.value)}
                            placeholder="Enter budget name"
                        />
                        <input
                            type="number"
                            value={newBudgetAmount}
                            onChange={(e) => setNewBudgetAmount(e.target.value.toString())}
                            placeholder="Maximum amount to spend"
                        />
                        <button onClick={addBudget}>Add</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
