<template>
    <section id="projectsSection">
        <h2>Projects</h2>
        <div class="grid">
            <div class="project">
                <h3>Stock Market Prediction</h3>
                <div>
                    <a href="https://github.com/RobertBinkowski/Stock-Market-Price-Prediction" target="_self"><p class="fa-brands fa-github"></p></a>
                </div>
                <p>Application designed to help predict the stock market price</p>
                <div class="grid">
                    <em>Python</em>
                    <em>Flask</em>
                </div>
            </div>
            <div class="project">
                <h3>Services App</h3>
                <div>
                    <a href="https://github.com/RobertBinkowski/Services-App-and-Dashboard" target="_self"><p class="fa-brands fa-github"></p></a>
                </div>
                <p>Application designed to help specialists find customers</p>
                <div class="grid">
                    <em>Vue.js</em>
                    <em>Laravel</em>
                    <em>MariaDB</em>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import "../assets/scss/variables";
#projectsSection{
    display: block;
    .project{
        border: 1px solid $acc-2;
        a{
            font-size: 1.5em;
        }
    }
}
</style>