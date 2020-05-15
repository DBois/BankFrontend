<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { getAccounts } from "./DataAccess/DataAccess";
  let cpr, loading, response;
  export let exception;

  const onSubmit = async () => {
    exception = undefined;
    loading = true;
    response = undefined;
    try {
      await getAccounts(cpr)
        .then(res => res.json())
        .then(json => (response = json));
      console.log(response);
      loading = false;
    } catch (err) {
      if (err.json) {
        await err.json().then(e => {
          exception = e;
          console.log(exception);
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
    margin-bottom: 2em;
  }
</style>

<div class="get-accounts-container">
  <h2>Get customer accounts</h2>
  <div class="input-container">
    <TextInput
      name="getaccounts-cpr"
      bind:value={cpr}
      placeholder="CPR Number" />
    {#if loading === true}
      <Spinner />
    {:else}
      <Button name="getaccounts-submit" text="Submit" onclick={onSubmit} />
    {/if}
  </div>
  <div class="response">
    {#if response}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Balance</th>
            <th scope="col">Account No.</th>
            <th scope="col">Bank Name</th>
            <th scope="col">Bank CVR</th>
          </tr>
        </thead>
        <tbody>
          {#each response as account, i}
            <tr>
              <th scope="row">{i + 1}</th>
              <th name={i + 'balance'}>$ {account.balance / 100}</th>
              <th name={i + 'number'}>{account.number}</th>
              <th name={i + 'bankname'}>{account.bank.name}</th>
              <th name={i + 'cvr'}>{account.bank.cvr}</th>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}

  </div>
</div>
