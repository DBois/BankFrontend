<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { getAccounts } from "./DataAccess/DataAccess";
  let cpr, loading, response;

  const onSubmit = async e => {
    loading = true;
    response = undefined;
    response = await getAccounts(cpr);
    loading = false;
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
    <TextInput bind:value={cpr} placeholder="CPR Number" />
    {#if loading === true}
      <Spinner />
    {:else}
      <Button text="Submit" onclick={onSubmit} />
    {/if}
  </div>
  <div class="response">
    {#if response !== undefined}
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
              <th scope="row">{i}</th>
              <th>$ {account.balance / 100}</th>
              <th>{account.number}</th>
              <th>{account.bank.name}</th>
              <th>{account.bank.cvr}</th>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}

  </div>
</div>
