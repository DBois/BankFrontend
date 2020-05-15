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
      await err.json().then(e => (exception = e));
      loading = false;
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
            <th name="getaccount-resbalance" scope="col">Balance</th>
            <th name="getaccount-resnumber" scope="col">Account No.</th>
            <th name="getaccount-resname" scope="col">Bank Name</th>
            <th name="getaccount-rescvr" scope="col">Bank CVR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>$ {response.balance / 100}</th>
            <th>{response.number}</th>
            <th>{response.bank.name}</th>
            <th>{response.bank.cvr}</th>
          </tr>
        </tbody>
      </table>
    {/if}

  </div>
</div>
