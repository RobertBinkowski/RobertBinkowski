<template>
    <section id="projectsSection">
        <h2>Some Projects I Have Done</h2>
            <div class="experience">
                <a href="https://github.com/RobertBinkowski/Stock-Market-Price-Prediction" target="_self">
                    <div>
                        <p class="fa-solid fa-folder-open left"></p>
                        <div class="right">
                            <p class="fa-brands fa-github"></p> <p class="fa-solid fa-arrow-up-right-from-square"></p>
                        </div>
                        <h3>Stock Market Prediction</h3>
                        <p>
                            Using <strong>Machine Learning</strong>, the application predicts selected end of day price.<br>
                            <strong>Long Short-Term Memory</strong> algorithm was used for this project. - <small><em>2021</em></small>
                        </p>
                        <div class="grid">
                            <em>Python</em>
                            <em>Flask</em>
                            <em>Machine Learning</em>
                            <em>LSTM</em>
                        </div>
                    </div>
                    <div>
                        <img src="../assets/logo/projects/project1.png" alt="project1 ScreenCapture" class="exp-screen">
                    </div>
                </a>
            </div>
            <div class="experience">
                <a href="https://github.com/RobertBinkowski/Services-App-and-Dashboard" target="_self">
                    <div>
                        <p class="fa-solid fa-folder-open left"></p>
                        <div class="right">
                            <p class="fa-brands fa-github"></p> <p class="fa-solid fa-arrow-up-right-from-square"></p>
                        </div>
                        <h3>Stock Market Prediction</h3>
                        <p>
                            Mobile First, a web application designed to allow users to advertise their services to others. - <small><em>In Progress</em></small>
                        </p>
                        <div class="grid">
                            <em>Vue.js</em>
                            <em>Laravel</em>
                            <em>SCSS</em>
                            <em>PWA</em>
                        </div>
                    </div>
                    <div>
                        <img src="../assets/logo/projects/project2.png" alt="project2 ScreenCapture" class="exp-screen">
                    </div>
                </a>
            </div>
            <div class="experience">
                <a href="https://github.com/RobertBinkowski/grocery-app" target="_self">
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
                        <div class="grid">
                            <em>PHP</em>
                            <em>SCSS</em>
                            <em>JavaScript</em>
                            <em>MySQL</em>
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
                top: 1em;
                left: 0;
                font-size: 1.2em;
            }
            .right{
                position: absolute;
                top: 0em;
                right: 0em;
                font-size: 1.2em;
            }

        }
    }
}
</style>