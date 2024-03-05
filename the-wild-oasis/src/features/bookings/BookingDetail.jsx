import styled from "styled-components";
import { HiTrash } from "react-icons/hi";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const navigate = useNavigate();

  const { checkoutMutate, isCheckingOut } = useCheckout();
  const { deleteBookingMutate, isDeletingBooking } = useDeleteBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { id, status } = booking;

  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleDeleteBooking() {
    if (!id) return;

    deleteBookingMutate(id);
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkoutMutate(id)}
              disabled={isCheckingOut}
            >
              Check out
            </Button>
          )}

          <Modal.Open opens="delete">
            <Button
              variation="danger"
              icon={<HiTrash />}
              disabled={isDeletingBooking}
            >
              Delete
            </Button>
          </Modal.Open>

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={handleDeleteBooking}
            />
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
