import axios from "axios";

export default class TasksService {

    static async addNew(name, body) {
        return await axios.post('https://dimension-server-for-my-app.onrender.com/api/tasks/add-new', {
            name,
            body
            }
        );
    }

    static async getAll(limit = 10, page = 1) {
        return await axios.get('https://dimension-server-for-my-app.onrender.com/api/tasks/all', {
            params: {
                limit,
                page
            }
        });
    }

    static async getOne(id) {
        return await axios.get('https://dimension-server-for-my-app.onrender.com/api/tasks/get-one/' + id);
    }

    static async setTask(id, val) {
        val === undefined && (val = true)
        return await axios.put('https://dimension-server-for-my-app.onrender.com/api/tasks/change', {
                id,
                val
            }
        );
    }

    static async deleteTask(id) {
        return await axios.delete('https://dimension-server-for-my-app.onrender.com/api/tasks/delete/' + id);
    }
};