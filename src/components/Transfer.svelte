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
    transferTime,
    response;
  export let exception;

  // TODO: Round up if 3rd element is bigger thand 2nd
  const limitDecimals = array => {
    let newNumb = array[0] + array[1].substring(0, 2);
    return array[1].length == 1
      ? newNumb + "0"
      : array[0] + array[1].substring(0, 2);
  };

  const transfer = async () => {
    // Reset values on submit
    exception = undefined;
    loading = true;
    response = "";

    let newAmount;
    if (amount.includes(",")) {
      let decimals = amount.split(",");
      newAmount = limitDecimals(decimals);
    } else if (amount.includes(".")) {
      let decimals = amount.split(".");
      newAmount = limitDecimals(decimals);
    } else {
      newAmount = Number(amount) * 100;
    }
    const searchQuery = {
      amount: newAmount,
      source,
      target
    };
    try {
      await transferMoney(searchQuery)
        .then(res => res.json())
        .then(json => (response = json));
      loading = false;
    } catch (err) {
      await err.json().then(e => (exception = e));
      console.log(exception);

      loading = false;
    }

    if (exception !== undefined) return;
    let date = new Date(response.time);
    transferDate = date.toLocaleDateString();
    transferTime = date.toLocaleTimeString();
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
  table {
    margin: 0;
  }
  table,
  td,
  th {
    border: solid;
    border-width: 0.1em;
    border-color: black;
  }

  .table-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="transfer-container">
  <h2>Transfer money</h2>

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
        placeholder="100" />
    </div>
    {#if loading === true}
      <Spinner />
    {:else}
      <Button text="Transfer" />
    {/if}

  </form>
  {#if response}
    <h2 style="color: green">Transfer succes!</h2>
    <div class="table-container">
      <table class="table-sm">
        <thead>
          <th>Source</th>
          <th>Target</th>
          <th>Amount</th>
          <th>Date</th>
        </thead>
        <tbody>
          <tr>
            <td>{response.source}</td>
            <td>{response.target}</td>
            <td>$ {response.amount / 100}</td>
            <td>{transferTime + ' ' + transferDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  {/if}

</div>
