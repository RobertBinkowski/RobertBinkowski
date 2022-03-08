<template>
    <section id="welcomeSection">
        <div class="topLogo">
            <LogoSVG/>
        </div>
        <p>Hi, I'm</p>
        <h1>Robert Binkowski</h1>
        <h2>Full Stack Developer</h2>
        <p>
            I am a Software Developer, specialised in <strong>Web Development</strong>.<br>
            My work branches from <em>UI</em> and <em>UX</em> to the <em>Server</em>. 
        </p>
        <div style="display:flex;">
            <a href="https://github.com/RobertBinkowski" target="_blank" class="button">GitHub</a>
            <a href="https://docs.google.com/document/d/1SQ6XWF39Ibd1BbfVPTALshtNB7liDILF/view" target="_blank" class="button">Resume</a>
        </div>
    </section>
</template>

<style lang="scss" scope>
@import "../assets/scss/variables";

#welcomeSection{
    height: 100vh;
    h1 {
        font-size: calc(3rem + 2vw);
        margin-bottom: 0;
        color: $acc-2;
    }
    h2{
        margin-top: 0;
        color: $acc-1;
        font-size: calc(1rem + 2vw);
    }
    .topLogo{
        display: none;
    }
}
</style>

<script>
import LogoSVG from '../components/LogoSVG.vue';
export default {
    components: {
        LogoSVG
    }    
}


</script>