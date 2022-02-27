<template>
    <section id="aboutSection">
        <div>
            <h2>A little About Me</h2>
            <p>Hello, My name is Robert and I love working on new and interesting Technologies.<br>
                Ever since my first interaction with Web Development in <em>2017</em>, I was intrigued.<br>
                There is always something new and exciting on the horyzon of software development.<br>
                Which always pushes me forward to reach new hights.
                <br><br>
                I always strive to implement new and well implemented coding techniques such as 
                <strong>Responsive Design</strong>. 
                <br>
                My favourite IDE is Visual Studio Code thanks to it's modularity.
                <br>
                Here are a few technologies I have experience with:
            </p>
            <div class="grid">
                <em title="Java" class="fa-brands fa-java"></em>
                <em title="JavaScript" class="fa-brands fa-js"></em>
                <em title="Python" class="fa-brands fa-python"></em>
                <em title="Vue.Js" class="fa-brands fa-vuejs"></em>
                <em title="SASS" class="fa-brands fa-sass"></em>
                <em title="PHP" class="fa-brands fa-php"></em>
                <em title="MySQL" class="fa-solid fa-database"></em>
                <em title="C++" class="fa-solid fa-c">++</em>
            </div>
        </div>
        <div>
            <img src="../assets/logo/photo.jpeg" alt="myphoto" class="myPic">
        </div>
    </section>    
</template>

<style lang="scss">
@import "../assets/scss/variables";
#aboutSection{
    .fa-brands, .fa-solid{
        font-size: 2em;
    }
    .myPic{
    height:20em;
    border: 1px solid #ffffff00;
    border-radius: 1em; 
    filter: grayscale(100%);
    transition: $tr-s;
    &:hover{
        filter: grayscale(0%);
        border-color: $acc-2;
        border-radius: .1em;
    }
}
}
</style>