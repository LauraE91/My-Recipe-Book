import React from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipe";
import RecipeCardForm from "./components/RecipeCardForm";
import RecipeCardThumbnail from "./components/RecipeCardThumbnail";
import RecipeCard from "./components/RecipeCard";
import EditRecipe from "./components/EditRecipe";
import BackArrow from "./components/BackArrow";
import Search from "./components/Search";

let navMenu;


class RecipeBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "default",
      navMenuOpen: false,
      errorMsg: "",
      recipeList: [],
      ingredientlist: [],
      search: "",
    };
  }

  componentDidMount() {
    // Retrieve both the updated list and filtered from the local storage
    //localStorage.setItem("recipes", this.state.recipeList);

    const recipes = JSON.parse(localStorage.getItem("recipes"));
    if(localStorage.recipes) {
      this.setState({ recipeList: recipes });
    }

  }

  handleIngredientChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddIngredient = (amount, ingredientname, ingredientid) => {
    // Create a new ingredient object
    let newIngredient = {
      amount: this.state.amount,
      ingredientname: this.state.ingredientname,
      ingredientid: Date.now(),
    };

    // Add amount and ingredient to the ingredientList
    this.setState({
      ingredientlist: [...this.state.ingredientlist, newIngredient],
    });

    // Reset the input fields
    this.setState({
      amount: "",
      ingredientname: "",
      ingredientid: "",
    });
  };

  handleRemoveIngredient = (ingredientid) => {
    const filteredIngredientList = this.state.ingredientlist.filter(
      (ingredient) => ingredientid !== ingredient.ingredientid
    );
    this.setState({ ingredientlist: filteredIngredientList });
  };

  // Add Recipe Btn - Open Add Recipe Form
  handleAddRecipe = () => {
    this.setState({ view: "recipeForm" });
    this.setState({ errorMsg: "" });
    this.setState({
      title: "",
      source: "",
      servings: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      ingredientlist: [],
      instructions: "",
      notes: "",
      id: "",
    });
  };

  // Close Add Recipe Form
  handleCancel = () => {
    this.setState({ view: "default" });
  };

  // onChange for Add Recipe Form
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name) {
      this.setState({ errorMsg: "" });
    }
  };

  handleAddNewRecipe = (
    title,
    source,
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredientlist,
    instructions,
    notes,
    id
  ) => {
    //id
    const newRecipe = {
      title: title,
      source: source,
      servings: servings,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      ingredientlist: ingredientlist,
      instructions: instructions,
      notes: notes,
      id: Date.now(),
    };

    if (title) {
      localStorage.setItem(
        "recipes",
        JSON.stringify([...this.state.recipeList, newRecipe])
      );
      // Add a new recipe to localStorage
      this.setState({ view: "recipeSubmitted" });
      this.setState({ recipeList: [...this.state.recipeList, newRecipe] });

      this.setState({ errorMsg: "" });
    }

    if (!title) {
      this.setState({ view: "recipeForm" });
      this.setState({ errorMsg: "Please add a title" });
      this.setState({ recipeList: [...this.state.recipeList] });
    }
  }; // end handleAdddNewRecipe

  handleSubmitNewRecipe = (e) => {
    e.preventDefault();
    this.handleAddNewRecipe(
      this.state.title,
      this.state.source,
      this.state.servings,
      this.state.prepTime,
      this.state.cookTime,
      this.state.totalTime,
      this.state.ingredientlist,
      this.state.instructions,
      this.state.notes,
      this.state.id
    );
    this.setState({
      title: "",
      source: "",
      servings: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      ingredientlist: [],
      instructions: "",
      notes: "",
    });
  };

  handleDeleteRecipe = (recipeId) => {
    // Delete a recipe from the database
    const filteredList = this.state.recipeList.filter(
      (recipe) => recipeId !== recipe.id
    );
    this.setState({ recipeList: filteredList });
    // set the filtered list to local storage
    localStorage.setItem("recipes", JSON.stringify(filteredList));
  };

  handleOpenThumbnail = (
    title,
    source,
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredientlist,
    instructions,
    notes,
    id
  ) => {
    this.setState({ view: "openRecipeCard" });
    // Set the state of the items in the ingredient object

    this.setState({
      title: title,
      source: source,
      servings: servings,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      ingredientlist: ingredientlist,
      instructions: instructions,
      notes: notes,
      id: id,
    });
  };

  //For the back button in the openRecipeCard view
  handleBackBtnClick = () => {
    this.setState({ view: "default" });
  };

  // For when the Edit Btn on Thumbnail is clicked
  handleClickEdit = (
    title,
    source,
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredientlist,
    instructions,
    notes,
    id
  ) => {
    //id
    this.setState({ view: "editForm" });
    this.setState({ errorMsg: "" });
    // Sets the state of the form, receiving the data from the thumbnail component
    this.setState({
      title: title,
      source: source,
      servings: servings,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      ingredientlist: ingredientlist,
      instructions: instructions,
      notes: notes,
      id: id,
    });
  };

  //For onChange for the Edit Form
  handleEditChange = (e) => {
    // This value needs to go to the state
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name) {
      this.setState({ errorMsg: "" });
    }
  };

  //title, source, servings, prepTime, cookTime, totalTime, ingredients, instructions, notes, id

  // Receives each updated value and sets the state on an updated recipe
  handleUpdateRecipe = (
    title,
    source,
    servings,
    prepTime,
    cookTime,
    totalTime,
    ingredientlist,
    instructions,
    notes,
    id
  ) => {
    // Make a copy of the recipe List
    const updatedList = [...this.state.recipeList];

    // Add the new values to the updated recipe
    const updatedRecipe = {
      title: title,
      source: source,
      servings: servings,
      prepTime: prepTime,
      cookTime: cookTime,
      totalTime: totalTime,
      ingredientlist: ingredientlist,
      instructions: instructions,
      notes: notes,
      id: id,
    };
    // Form validation

    // If the title field is empty, keep the edit Form up, show an error message, and do not change the state of the recipeList
    if (title === "") {
      this.setState({ view: "editForm" });
      this.setState({ errorMsg: "Please add a title" });
      this.setState({ recipeList: [...this.state.recipeList] });
    }

    if (title) {
      // Find the index of the recipe I clicked on
      const index = updatedList.findIndex((r) => r.id === id);

      // Set the state of each property to the updated value
      updatedList[index].title = title;
      updatedList[index].source = source;
      updatedList[index].servings = servings;
      updatedList[index].prepTime = prepTime;
      updatedList[index].cookTime = cookTime;
      updatedList[index].totalTime = totalTime;
      updatedList[index].ingredientlist = ingredientlist;
      updatedList[index].instructions = instructions;
      updatedList[index].notes = notes;

      // set the updatedList list to local storage
      localStorage.setItem("recipes", JSON.stringify(updatedList));
      this.setState({ view: "recipeSubmitted" });
      this.setState({ errorMsg: "" });

    }
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  switchFunction() {
    let filteredItems = [];
    if(localStorage.recipes) {
      filteredItems = this.state.recipeList.filter((recipe) => {
       if (recipe.title) {
         return (
           recipe.title
             .toLowerCase()
             .indexOf(this.state.search.toLowerCase()) !== -1
         );
       } else {
         return null;
       }
     });
    }





    switch (this.state.view) {
      case "recipeSubmitted":
        return (
          <div className="App">
            <AddRecipe handleAddRecipe={this.handleAddRecipe} />
            <Search
              search={this.state.search}
              handleSearchChange={this.handleSearchChange}
            />

            <div className="app-body">
              {filteredItems.map((recipe) => (
                <RecipeCardThumbnail
                  title={recipe.title}
                  source={recipe.source}
                  servings={recipe.servings}
                  prepTime={recipe.prepTime}
                  cookTime={recipe.totalTime}
                  totalTime={recipe.totalTime}
                  ingredientlist={recipe.ingredientlist}
                  instructions={recipe.instructions}
                  notes={recipe.notes}
                  key={recipe.id}
                  id={recipe.id}
                  handleDeleteClick={() => this.handleDeleteRecipe(recipe.id)}
                  handleOpenThumbnail={this.handleOpenThumbnail}
                  handleClickEdit={this.handleClickEdit}
                  amount={this.state.amount}
                  ingredientname={this.state.ingredientname}
                  ingredientid={this.state.ingredientid}
                />
              ))}
            </div>
          </div>
        );
        break;

      case "recipeForm":
        return (
          <div className="App">
            <div className="app-body">
              <RecipeCardForm
                handleCancel={this.handleCancel}
                handleSubmitNewRecipe={this.handleSubmitNewRecipe}
                handleChange={this.handleChange}
                handleIngredientChange={this.handleIngredientChange}
                handleAddIngredient={this.handleAddIngredient}
                handleRemoveIngredient={this.handleRemoveIngredient}
                ingredientlist={this.state.ingredientlist}
                errorMsg={this.state.errorMsg}
                amount={this.state.amount}
                ingredientname={this.state.ingredientname}
              />
            </div>
          </div>
        );
        break;

      case "openRecipeCard":
        return (
          <div className="App">
            <BackArrow handleBackBtnClick={this.handleBackBtnClick} />

            <div className="app-body">
              <RecipeCard
                title={this.state.title}
                source={this.state.source}
                servings={this.state.servings}
                prepTime={this.state.prepTime}
                cookTime={this.state.cookTime}
                totalTime={this.state.totalTime}
                ingredientlist={this.state.ingredientlist}
                instructions={this.state.instructions}
                notes={this.state.notes}
                ingredientid={this.state.ingredientid}
                amount={this.state.amount}
                ingredientname={this.state.ingredientname}
              />
            </div>
          </div>
        );
        break;

      case "editForm":
        return (
          <div className="App">
            <EditRecipe
              title={this.state.title}
              source={this.state.source}
              servings={this.state.servings}
              prepTime={this.state.prepTime}
              cookTime={this.state.cookTime}
              totalTime={this.state.totalTime}
              ingredientlist={this.state.ingredientlist}
              instructions={this.state.instructions}
              notes={this.state.notes}
              id={this.state.id}
              handleCancel={this.handleCancel}
              handleEditChange={this.handleEditChange}
              handleUpdateRecipe={this.handleUpdateRecipe}
              handleSaveSubmit={this.handleSaveSubmit}
              handleIngredientChange={this.handleIngredientChange}
              handleAddIngredient={this.handleAddIngredient}
              handleRemoveIngredient={this.handleRemoveIngredient}
              errorMsg={this.state.errorMsg}
              amount={this.state.amount}
              ingredientname={this.state.ingredientname}
            />
          </div>
        );
      // Try this: if local storage is empty, return <addRecipe /> else return <AddRecipe /> AND <RecipeCardThumbnail />
      default:
        if (!localStorage.recipes) {
          return (
            <div className="App">
              <AddRecipe handleAddRecipe={this.handleAddRecipe} />

              <div className="field has-addons search-container">
                <input
                  className="input search-bar is-medium"
                  type="text"
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                />
                <button className="button secondary-btn is-medium">Search</button>
              </div>

              <div className="app-body"></div>
              <div className="default-message">
                <h5 className="has-text-weight-semibold">
                  You have not added any recipes yet
                </h5>
              </div>
            </div>
          );
        }

         else
          return (
            <div className="App">
              <AddRecipe handleAddRecipe={this.handleAddRecipe} />

              <Search
                search={this.state.search}
                handleSearchChange={this.handleSearchChange}
              />

              <div className="app-body">
                {filteredItems.map((recipe) => (
                  <RecipeCardThumbnail
                    title={recipe.title}
                    source={recipe.source}
                    servings={recipe.servings}
                    prepTime={recipe.prepTime}
                    cookTime={recipe.totalTime}
                    totalTime={recipe.totalTime}
                    ingredientlist={recipe.ingredientlist}
                    instructions={recipe.instructions}
                    notes={recipe.notes}
                    key={recipe.id}
                    id={recipe.id}
                    handleDeleteClick={() => this.handleDeleteRecipe(recipe.id)}
                    handleOpenThumbnail={this.handleOpenThumbnail}
                    handleClickEdit={this.handleClickEdit}
                    ingredientid={recipe.ingredientid}
                    amount={this.state.amount}
                    ingredientname={this.state.ingredientname}
                  />
                ))}
              </div>
            </div>
          );
    }
  }

  render() {
    return (
      <div>{this.switchFunction()}</div>
    )

  }
}
export default RecipeBook;
