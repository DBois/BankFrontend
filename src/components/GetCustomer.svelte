<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { getCustomer } from "./DataAccess/DataAccess";
  let cpr, loading, response;

  const onSubmit = async e => {
    loading = true;
    response = undefined;
    response = await getCustomer(cpr);
    console.log(response);
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
  <h2>Get customer</h2>
  <div class="input-container">
    <TextInput bind:value={cpr} placeholder="CPR number" />
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
            <th scope="col">Name</th>
            <th scope="col">CPR</th>
            <th scope="col">Account Numbers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{response.name}</th>
            <th>{response.cpr}</th>
            <th>{response.accountNumbers.join(', ')}</th>
          </tr>
        </tbody>
      </table>
    {/if}

  </div>
</div>
