<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { transferMoney } from "./DataAccess/DataAccess";

  let amount = "",
    source,
    target,
    transferDate,
    loading = false,
    transferTime;
  let response = "";

  // TODO: Round up if 3rd element is bigger thand 2nd
  const limitDecimals = array => {
    let newNumb = array[0] + array[1].substring(0, 2);
    return array[1].length == 1
      ? newNumb + "0"
      : array[0] + array[1].substring(0, 2);
  };

  const transfer = async () => {
    // Reset values on submit
    loading = true;
    response = "";

    let newAmount;
    if (amount.includes(",")) {
      let decimals = amount.split(",");
      newAmount = limitDecimals(decimals);
    } else if (amount.includes(".")) {
      let decimals = amount.split(".");
      newAmount = limitDecimals(decimals);
    }
    const searchQuery = {
      amount: newAmount,
      source,
      target
    };
    const URL = `http://localhost:8081/accounts/transfer/`;
    response = await transferMoney(searchQuery);
    let date = new Date(response.time);
    transferDate = date.toLocaleDateString();
    transferTime = date.toLocaleTimeString();
    loading = false;
  };
  // Used to validate the input for the amount parameter
  const parseAmount = e => {
    if (!Number.isNaN(Number(e.key))) {
      // If it's a number
      // do nothing
    } else if (
      amount.length >= 1 &&
      (e.key === "." || e.key === ",") &&
      (!amount.includes(",") && !amount.includes("."))
    ) {
      // Allow 1 comma or decimal
      // do nothing
    } else if (
      (e.ctrlKey && e.key !== "v") ||
      (e.shiftKey && e.key.lenght > 1)
    ) {
      // do nothing
    } else if (e.key.length > 1) {
      // do nothing
    } else e.preventDefault();
  };
</script>

<style>
  .transfer-container {
    text-align: center;
    flex-direction: row;
    padding: 1em;
    max-width: 100vw;
    margin: 0;
  }
  .currencyinput {
    position: absolute;
    padding-left: 0.2em;
  }

  .input_container {
    display: flex;
    align-items: center;
    width: 16em;
    height: 3em;
    border: black solid 1px;
    margin-left: 5px;
  }

  form {
    display: flex;
    justify-content: center;
  }

  input {
    border: none;
    margin: 0;
    padding-left: 1em;
    width: 30em;
  }

  input:focus {
    outline: none;
  }
</style>

<div class="transfer-container">
  <h2>Transfer money</h2>
  {#if response !== ''}
    <p>
      Transfered ${response.amount / 100} to account: "{response.target}" from
      account: "{response.source}" at {transferTime} {transferDate}
    </p>
  {/if}
  <form on:submit|preventDefault={transfer}>
    <TextInput bind:value={source} placeholder="Source account" />
    <TextInput bind:value={target} placeholder="Target account" />
    <div class="input_container">
      <span class="currencyinput">$</span>
      <input
        bind:value={amount}
        on:keydown={parseAmount}
        on:mouseup|preventDefault
        type="text"
        name="amount"
        placeholder="100"
        pattern="[0-9]+(,|.)?[0-9]+" />
    </div>
    {#if loading === true}
      <Spinner />
    {:else}
      <Button text="Transfer" />
    {/if}

  </form>
</div>
