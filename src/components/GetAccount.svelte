<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { getAccount } from "./DataAccess/DataAccess";
  let accountNumber, loading, response;

  const onSubmit = async e => {
    loading = true;
    response = undefined;
    response = await getAccount(accountNumber);
    loading = false;
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
    <TextInput bind:value={accountNumber} placeholder="Account number" />
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
            <th scope="col">Balance</th>
            <th scope="col">Account No.</th>
            <th scope="col">Bank Name</th>
            <th scope="col">Bank CVR</th>
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
