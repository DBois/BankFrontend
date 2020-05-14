<script>
  export let value, placeholder;
</script>

<style>
  input {
    border: none;
    margin: 0;
    padding-left: 1em;
    width: 30em;
  }

  input:focus {
    outline: none;
  }
  .input_container:focus {
    border-color: cyan;
  }

  .input_container {
    display: flex;
    align-items: center;
    width: 16em;
    height: 3em;
    border: black solid 1px;
    margin-left: 5px;
  }
</style>

<div class="input_container">
  <input bind:value type="text" name="source" {placeholder} />
</div>
