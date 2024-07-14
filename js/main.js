$(document).ready(function () {
    $('.loading-screen').fadeOut(500)
})

$(document).ready(function () {
    $('.inner-loading-screen').fadeOut(500)
})

let navWidth = $('.nav-tap').outerWidth()
$('.open-close-icon').click(function () {
    if ($('.side-nav-menu').css('left') === '0px')
        $('.side-nav-menu').animate({ left: `-${navWidth}px` }, 500)
    else
        $('.side-nav-menu').animate({ left: `0px` }, 500)
})

async function getMeal() {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        data = await url.json()
        displayMeal(data.meals)
    }
    catch (error) {
        console.log(error)
    }
}

function isIndexPage() {
    return window.location.pathname.endsWith('index.html')
}

var row = document.querySelector('.row')

function displayMeal(meals) {
    if (!isIndexPage()) return
    row.innerHTML = ''
    meals.forEach(meal => {
        var box = `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
    `
        row.innerHTML += box
    });
}

async function getMealDetails(idMeal) {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        data = await url.json()
        meal = data.meals[0]

        var box = `
        <div class="col-md-4">
            <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${meal.strInstructions}</p>
            <h3>
                <span class="fw-bolder">Area : </span>
                ${meal.strArea}
            </h3>
            <h3>
                <span class="fw-bolder">Category : </span>
                ${meal.strCategory}
            </h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${getIngredients(meal)}
            </ul>
            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-danger m-2 p-1">
                ${meal.strTags}
                </li>
            </ul>
            <a href="" class="btn btn-success">Source</a>
            <a href="" class="btn btn-danger">Youtube</a>
        </div>
    `
        row.innerHTML = box
    } catch (error) {
        console.log(error)
    }
}

function getIngredients(meal) {
    let ingredients = ''
    for (let i = 1; i <= 20; i++) {
        ingredient = meal[`strIngredient${i}`]
        measure = meal[`strMeasure${i}`]

        if (ingredient != '' && measure != ' ') {
            ingredients += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`
        }
    }
    return ingredients
}

getMeal()

function isCategoriesPage() {
    return window.location.pathname.endsWith('categories.html')
}

async function getCategory() {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        data = await url.json()
        displayCategory(data.categories)
    }
    catch (error) {
        console.log(error)
    }
}

function displayCategory(categories) {
    if (!isCategoriesPage()) return
    row.innerHTML = ''
    categories.forEach(category => {
        var box = `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${category.strCategoryThumb}" alt="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                    <h3>${category.strCategory}</h3>
                    <p>${category.strCategoryDescription}</p>
                </div>
            </div>
        </div>
    `
        row.innerHTML += box
    });
}

async function getCategoryMeals(strCategory) {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
        data = await url.json()

        row.innerHTML = ''
        data.meals.forEach(meal => {
            var box = `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
    `
            row.innerHTML += box
        })
    } catch (error) {
        console.log(error)
    }
}

getCategory()

function isAreaPage() {
    return window.location.pathname.endsWith('area.html')
}

async function getArea() {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        data = await url.json()
        displayArea(data.meals)
    }
    catch (error) {
        console.log(error)
    }
}

function displayArea(meals) {
    if (!isAreaPage()) return
    row.innerHTML = ''
    meals.forEach(meal => {
        var box = `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${meal.strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${meal.strArea}</h3>
            </div>
        </div>
    `
        row.innerHTML += box
    })
}

async function getAreaMeals(strArea) {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
        data = await url.json()

        row.innerHTML = ''
        data.meals.forEach(meal => {
            var box = `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
    `
            row.innerHTML += box
        })
    } catch (error) {
        console.log(error)
    }
}

getArea()

function isIngredientsPage() {
    return window.location.pathname.endsWith('ingredients.html')
}

async function getIngredientsCat() {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        data = await url.json()
        displayIngredients(data.meals)
    }
    catch (error) {
        console.log(error)
    }
}

function displayIngredients(meals) {
    if (!isIngredientsPage()) return
    row.innerHTML = ''
    meals.forEach(meal => {
        if (meal.strDescription !== null && meal.strDescription.trim() !== '') {
            var box = `
        <div class="col-md-3">
            <div onclick="getIngredientMeals('${meal.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${meal.strIngredient}</h3>
                <p>${meal.strDescription.split(" ").splice(0, 20).join(" ")}</p>
            </div>
        </div>
    `
            row.innerHTML += box
        }
    })
}

async function getIngredientMeals(strIngredient) {
    try {
        url = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
        data = await url.json()

        row.innerHTML = ''
        data.meals.forEach(meal => {
            var box = `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
    `
            row.innerHTML += box
        })
    } catch (error) {
        console.log(error)
    }
}

getIngredientsCat()