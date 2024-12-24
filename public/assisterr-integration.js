document.addEventListener('DOMContentLoaded', () => {
    const addGoalButton = document.getElementById('add-goal-button');

    addGoalButton.addEventListener('click', async () => {
        const goalInput = document.getElementById('goal-input').value;
        const goalDescription = document.getElementById('goal-description').value;

        if (!goalInput || !goalDescription) {
            alert('Please fill out both the goal and description.');
            return;
        }

        try {
            const tasks = await getSuggestedTasks(goalInput, goalDescription);
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `<span>✔</span> ${task}`;
                taskList.appendChild(li);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch tasks.');
        }
    });
});

async function getSuggestedTasks(goal, description) {
    const API_URL = 'https://api.assisterr.ai/api/v1/slm/dostigator_2016/chat/';
    const API_KEY = 'M75Kr69Ec-bqkIgA2-DhsZsVq8t-tMSzdCpDodVTKEM';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': API_KEY
            },
            body: JSON.stringify({
                query: `Goal: ${goal}\nDescription: ${description}`
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.tasks || [];
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}
