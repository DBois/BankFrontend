<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { postCustomer } from "./DataAccess/DataAccess";
  let data = { name: "", cpr: "" },
    loading,
    response;
  export let exception;

  const onSubmit = async e => {
    exception = undefined;
    loading = true;
    response = undefined;
    try {
      await postCustomer(data)
        .then(res => res.json())
        .then(json => (response = json));
      loading = false;
    } catch (err) {
      if (err.json) {
        await err.json().then(e => {
          exception = e;
          loading = false;
        });
      }
      else {

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
  p {
    color: green;
  }
</style>

<div class="get-account-container">
  <h2>Update customer</h2>
  <form>
    <div class="input-container">
      <TextInput
        name="updatecustomer-name"
        bind:value={data.name}
        placeholder="Name" />
      <TextInput
        name="updatecustomer-cpr"
        bind:value={data.cpr}
        placeholder="CPR number" />
      {#if loading === true}
        <Spinner />
      {:else}
        <Button
        name="updatecustomer-submit"
        text="Update" 
        onclick={onSubmit} />
      {/if}
    </div>
    {#if response}
      <p name="updatecustomer-res">Updated customer!</p>
    {/if}
  </form>

  <div class="response" />
</div>
