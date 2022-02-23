<template>
    <footer>
        <img src="#" id="footer-logo" alt="Logo">
        <br>
        <ul id="contact">

            <a href="mailto:binkowski95@gmail.com" target="_self">
                <li>
                    <p class="fa-solid fa-envelope-open"></p>
                </li>
            </a>
            <a href="https://github.com/RobertBinkowski" target="_self">
                <li>
                    <p class="fa-brands fa-github"></p>
                </li>
            </a>
            <a href="https://www.linkedin.com/in/robert-binkowski-9bb565195/" target="_self">
                <li>
                    <p class="fa-brands fa-linkedin"></p>
                </li>
            </a>
            <a href="https://www.instagram.com/binkowski95/" target="_self">
                <li>
                    <p class="fa-brands fa-instagram"></p>
                </li>
            </a>
        </ul>
        <br>
        <p>This website was designed and built by <strong>Robert Binkowski</strong></p>
        <br>
        <p>Special Thanks</p>
    </footer>
</template>

<style lang="scss">
@import '@/assets/root.scss';

    footer {
        text-align: center;
        background: var(--fott-back);
        border-top: 1px solid var(--acc-1);
        padding-top: 2em;
        padding-bottom: 3em;
        min-height: 10vh;
        margin-top: 1em;
        #footer-logo{
            font-size: 2em;
            margin-bottom: 1em;
        }
        li{
            font-size: 1.4em;
        }
    }
</style>