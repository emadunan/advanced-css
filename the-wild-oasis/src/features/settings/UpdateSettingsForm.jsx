import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    breakfastPrice,
    maxGuestsPerBooking,
  } = settings;

  const { editSettingMutate, isEditingSetting } = useEditSetting();

  function handleEdit(event, field) {
    const { value } = event.target;

    if (!value) return;

    editSettingMutate({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isEditingSetting}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleEdit(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isEditingSetting}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleEdit(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isEditingSetting}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleEdit(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isEditingSetting}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleEdit(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
