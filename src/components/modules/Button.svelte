<script>
  export let text, onclick;
</script>

<style>
  button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: salmon;
    color: white;
    font-family: sans-serif;
    font-size: 1.2em;
    border-radius: 0.3em;
    margin: 0;
  }
</style>

<div class="button">

  <button on:click={onclick}>{text}</button>

</div>
