<template>
    <header>
        <nav>
            <ul class="nav-ul">
                <a href="#welcomeSection" class="nav-a a-logo">
                    <li class="nav-li">
                        <LogoSVG/>
                    </li>
                </a>
                <a href="#aboutSection" class="nav-a" target="_self">
                    <li class="nav-li">
                        <p class="fa-solid fa-circle-info"></p>
                        <strong class="nav-txt">About</strong>
                    </li>
                </a>
                <a href="#projectsSection" class="nav-a" target="_self">
                    <li class="nav-li">
                        <p class="fa-solid fa-code-branch"></p>
                        <strong class="nav-txt">Projects</strong>
                    </li>    
                </a>
                <a href="#experienceSection" class="nav-a" target="_self">
                    <li class="nav-li">
                        <p class="fa-solid fa-briefcase"></p>
                        <strong class="nav-txt">Experience</strong>
                    </li>
                </a>
                <a href="#contactSection" class="nav-a" target="_self">
                    <li class="nav-li">
                        <p class="fa-solid fa-user"></p>
                        <strong class="nav-txt">Contact</strong>
                    </li>
                </a>
                <a href="https://docs.google.com/document/d/1SQ6XWF39Ibd1BbfVPTALshtNB7liDILF/view" 
                    class="nav-a li-resume" target="_self" >
                    <li class="nav-li">
                        <p class="fa-solid fa-file-signature"></p>
                        <strong class="nav-txt">Resume</strong>
                    </li>
                </a>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
nav {
  max-width: 100vw;
  left: 0;
  right: 0;
  z-index: 1;
  position: fixed;

    .nav-ul {
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.7);
        width: 100vw;
        margin: 0;
        max-width: 1500px;
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }

    .nav-li {
        width: 100%;
        height: 100%;
        padding: 1em 0 1em 0;
    }

    .nav-a {
        font-size: large;
    }
    a{
        width: 100%;
    }
    .a-logo{
        margin: -.5em;
        font-size: 1em;
    }
    li:hover {
        margin-top: -0.2em;
        margin-bottom: 0.2em;
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