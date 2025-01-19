// Write a function that makes a GET request to the JSONPlaceholder API and 
// returns posts that are longer than 100 characters.

// API URL: https://jsonplaceholder.typicode.com/posts
// Use axios library
type APIResponseType = {
    id: number,
    userId: number
    title: string,
    body: string,
}

async function fetchLongPosts(): Promise<APIResponseType[]> {
    // Your code goes here
    try {
        const response = await axios.get<APIResponseType[]>('https://jsonplaceholder.typicode.com/posts');
        return response.data.filter(post => post.body.length > 100);
    } catch (error) {
        console.error('Error fetching posts:', error);
    return []
}
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>
        </div>
    );
}

export default Counter;
export { fetchLongPosts };


module.exports = { fetchLongPosts }
