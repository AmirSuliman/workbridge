import { keyContactsAtISA } from '@/lib/keyContactsAtISA';
import Link from 'next/link';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return keyContactsAtISA.map((contact) => (
    <div key={contact.email} className="pt-4">
      <p className="text-[14px]">{contact.name}</p>
      <p className="opacity-50 font-medium text-[12px] mb-2">
        {contact.position}
      </p>

      <Link
        href={`mailto:${contact.email}`}
        target="_blank"
        className="flex flex-row gap-2 break-all text-[14px]"
      >
        <FaEnvelope size={15} className="mt-[2px] shrink-0" />
        {contact.email}
      </Link>
      <Link
        href={`tel:${contact.phone}`}
        target="_blank"
        className="flex flex-row gap-2 items-center text-[14px] mb-4"
      >
        <FaPhone
          size={15}
          className=" shrink-0"
          style={{ transform: 'rotate(90deg)' }}
        />
        {contact.phone}
      </Link>
    </div>
  ));
};
export default Contact;
