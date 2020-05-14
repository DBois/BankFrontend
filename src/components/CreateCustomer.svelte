<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { postCustomer } from "./DataAccess/DataAccess";
  let data = { name: "", cpr: "" },
    loading,
    response;

  const onSubmit = async e => {
    loading = true;
    response = undefined;
    response = await postCustomer(data);
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
  p {
    color: green;
  }
</style>

<div class="get-account-container">
  <h2>Create customer</h2>
  <form>
    <div class="input-container">
      <TextInput bind:value={data.name} placeholder="Name" />
      <TextInput bind:value={data.cpr} placeholder="CPR number" />
      {#if loading === true}
        <Spinner />
      {:else}
        <Button text="Create" onclick={onSubmit} />
      {/if}
    </div>
    {#if response}
      <p>Customer created!</p>
    {:else}
      <!-- else content here -->
    {/if}
  </form>

  <div class="response" />
</div>
