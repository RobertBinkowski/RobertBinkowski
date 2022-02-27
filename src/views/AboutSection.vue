<template>
    <section id="aboutSection">
        <div>
            <h2>A little About Me</h2>
            <p>Hello, My name is Robert and I love working on new and interesting Technologies.<br>
                Ever since my first interaction with Web Development in <em>2017</em>, I was intrigued.<br>
                I always try to learn something new. Staying stationary is not an option.
                <br><br>
                I always strive to implement new and well implemented coding techniques such as 
                <strong>Responsive Design</strong>. 
                <br>
                Here are a few technologies I have experience with:
            </p>
            <div class="grid">
                <em>Java</em>
                <em>C++</em>
                <em>Vue.Js</em>
                <em>PHP</em>
                <em>SCSS</em>
                <em>MySQL</em>
                <em>JavaScript</em>
                <em>Python</em>
            </div>
        </div>
        <div>
            <img src="../assets/logo/photo.jpg" alt="myphoto" class="myPic">
        </div>
    </section>    
</template>

<style lang="scss">
@import "../assets/scss/variables";
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
</style>