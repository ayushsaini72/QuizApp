import categories from "./categories.json";

function StartPage({
        fetchData, 
        numQuestions, 
        setNumQuestions, 
        categoryId, 
        setCategoryId
    }) {

    //Displaying all te category items as options of dropdown menu
    const categoriesList = categories.trivia_categories.map(category => {
        return <option value={category.id} key={category.id}>{category.name}</option>
    })

    //To set value of numQuestions as given by user
    function handleNumQuestions(event) {
        setNumQuestions(event.target.value)
    }

    //To give categoryId to the fetchData function to fetch data from api
    function handleCategoryId(event) {
        setCategoryId(event.target.value)
    }

    return(
        <main className="intro-page">
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-description">Can you take this challenge to solve this quiz</p>
            <form className="startPageForm" onSubmit={fetchData}>

                <input 
                    type="number" 
                    className="dropdown" 
                    placeholder="Enter the amount of questions" 
                    min={1} max={50} 
                    value={numQuestions} 
                    onChange={handleNumQuestions}
                    required
                />
                <select className="dropdown" value={categoryId} onChange={handleCategoryId} required>
                    <option defaultValue="">Select Category</option>
                    {categoriesList}
                </select>
                <input
                className="quiz-start"
                type='submit'
                value="Start Game"
                />
            </form>
        </main>
    )
}

export default StartPage;