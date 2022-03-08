<template>
    <section id="projectsSection">
        <h2>Some Projects I Have Done</h2>
            <div class="experience">
                <a href="https://github.com/RobertBinkowski/Stock-Market-Price-Prediction" target="_blank">
                    <div>
                        <p class="fa-solid fa-folder-open left"></p>
                        <div class="right">
                            <p class="fa-brands fa-github"></p> <p class="fa-solid fa-arrow-up-right-from-square"></p>
                        </div>
                        <h3>Stock Market Prediction</h3>
                        <p>
                            Using <strong>Machine Learning</strong>, the application predicts selected end of day price.<br>
                            <strong>Long Short-Term Memory (LSTM)</strong> algorithm was used for this project and deployed on <em>Flask</em>. - <small><em>2021</em></small>
                        </p>
                        <div class="grid technology">
                            <em title="Machine Learning" class="fa-solid fa-chalkboard-user"></em>
                            <em title="Python" class="fa-brands fa-python"></em>
                            <em title="Flask" class="fa-solid fa-server"></em>
                            <em title="LSTM" class="fa-solid fa-code"></em>
                        </div>
                    </div>
                    <div>
                        <img src="../assets/logo/projects/project1.png" alt="project1 ScreenCapture" class="exp-screen">
                    </div>
                </a>
            </div>
            <div class="experience">
                <a href="https://github.com/RobertBinkowski/Services-App-and-Dashboard" target="_blank">
                    <div>
                        <p class="fa-solid fa-folder-open left"></p>
                        <div class="right">
                            <p class="fa-brands fa-github"></p> <p class="fa-solid fa-arrow-up-right-from-square"></p>
                        </div>
                        <h3>Stock Market Prediction</h3>
                        <p>
                            Mobile First, a <em>Progressive Web Application (PWA)</em>.<br>Designed to allow users to find specialists nearby.<br>
                            Allowing users to advertise their skills as specialists, allowing them to view, edit current contracts.<br>
                            The service will use google maps to display all local specialists available.<br>
                            You can see the progress of the app on my GitHub. - <small><em>In Progress</em></small>
                        </p>
                        <div class="grid technology">
                            <em title="Vue.Js" class="fa-brands fa-vuejs"></em>
                            <em title="Laravel" class="fa-brands fa-laravel"></em>
                            <em title="SASS" class="fa-brands fa-sass"></em>
                            <em title="PWA" class="fa-solid fa-download"></em>
                        </div>
                    </div>
                    <div>
                        <img src="../assets/logo/projects/project2.png" alt="project2 ScreenCapture" class="exp-screen">
                    </div>
                </a>
            </div>
            <div class="experience">
                <a href="https://github.com/RobertBinkowski/grocery-app" target="_blank">
                    <div>
                        <p class="fa-solid fa-folder-open left"></p>
                        <div class="right">
                            <p class="fa-brands fa-github"></p> <p class="fa-solid fa-arrow-up-right-from-square"></p>
                        </div>
                        <h3>Grocery App</h3>
                        <p>
                            An application that reads receipts ingredients from a picture using <em>Tesseract</em> liblary.<br>
                            Saves it to the database and allows the user to view their speding. - <small><em>2020</em></small>
                        </p>
                        <div class="grid technology">
                            <em title="PHP" class="fa-brands fa-php"></em>
                            <em title="SASS" class="fa-brands fa-sass"></em>
                            <em title="JavaScript" class="fa-brands fa-js"></em>
                            <em title="MySQL" class="fa-solid fa-database"></em>
                        </div>
                    </div>
                    <div>
                        <img src="../assets/logo/projects/project3.png" alt="project3 ScreenCapture" class="exp-screen">
                    </div>
                </a>
            </div>
    </section>
</template>

<style lang="scss">
@import "../assets/scss/variables";
#projectsSection{
    
    .experience{
        div{
            position: relative;
            .left{
                position: absolute;
                top: 0em;
                left: 1em;
                font-size: 2em;
            }
            .right{
                position: absolute;
                top: -1em;
                right: 1em;
                font-size: 1.2em;
            }
            .technology{
                font-size: 2em;
            }

        }
    }
}
</style>