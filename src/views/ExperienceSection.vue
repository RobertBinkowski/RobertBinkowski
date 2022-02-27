<template>
    <section id="experienceSection">
        <h2>Some Work I Have Done</h2>
        <div class="experience">
            <a href="https://sykownochata.pl/" target="_self">
                <div>
                    <p>
                        <img src="../assets/logo/experience/logo_2.png" alt="SykownoChataLogo" class="exp-logo"><br>
                        <strong>Business Website</strong><br>
                        <em>Sykowno Chata - Poland</em><br>
                        Summer 2019 
                    </p>
                    <br>
                    <p>
                        <em>Responsive</em>, <em>Mobile First</em> Website designed to help advertise customers apartments.
                    </p>
                    <div class="grid">
                        <em class="fa-brands fa-html5"></em>
                        <em class="fa-brands fa-css3-alt"></em>
                        <em class="fa-brands fa-php"></em>
                        <em class="fa-brands fa-js"></em>
                    </div>
                </div>
                <div>
                    <img src="../assets/logo/experience/splashScreen.png" alt="Website Screenshot" class="exp-screen">
                </div>
            </a>
        </div>
    </section>
</template>

<style lang="scss">
@import "../assets/scss/variables";
#experienceSection{
    a{
        .exp-logo{
            height: 5em;
        }
    }
    .fa-brands{
        font-size: 2em;
    }
}
</style>