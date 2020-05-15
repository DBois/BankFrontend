<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { getAccount } from "./DataAccess/DataAccess";
  let accountNumber, loading, response;
  export let exception;

  const onSubmit = async e => {
    exception = undefined;
    loading = true;
    response = undefined;
    try {
      await getAccount(accountNumber)
        .then(res => res.json())
        .then(json => (response = json));
      console.log(response);
      loading = false;
    } catch (err) {
      if (err.json) {
        await err.json().then(e => {
          exception = e;
          loading = false;
        });
      } else {
        exception = err;
        loading = false;
      }
    }
  };
</script>

<style>
  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
</style>

<div class="get-account-container">
  <h2>Get account</h2>
  <div class="input-container">
    <TextInput
      name="getaccount-number"
      bind:value={accountNumber}
      placeholder="Account number" />
    {#if loading === true}
      <Spinner />
    {:else}
      <Button name="getaccount-submit" text="Submit" onclick={onSubmit} />
    {/if}
  </div>
  <div class="response">
    {#if response !== undefined}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Balance</th>
            <th scope="col">Account No.</th>
            <th scope="col">Bank Name</th>
            <th scope="col">Bank CVR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td name="getaccount-resbalance">$ {response.balance / 100}</td>
            <td name="getaccount-resnumber">{response.number}</td>
            <td name="getaccount-resname">{response.bank.name}</td>
            <td name="getaccount-rescvr">{response.bank.cvr}</td>
          </tr>
        </tbody>
      </table>
    {/if}

  </div>
</div>
