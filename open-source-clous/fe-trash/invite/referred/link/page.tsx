"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import MainModal from "@/components/modals/MainModal";
import SubstackLink from "@/components/actions/SubstackLink";
import InfiniteLogoCarousel from "@/components/ui/infiniteloop";
import Footer from "@/components/navigation/Footer";

export default function SetViewTokenPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [modalType, setModalType] = useState("");
  const [referrerId, setReferrerId] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);

    // Extract query parameters from URL
    const url = new URL(window.location.href);
    const modalTypeParam = url.searchParams.get("modalType");
    const referrerIdParam = url.searchParams.get("referrerId");
    const companyIdParam = url.searchParams.get("companyId");
    const selectedRoleParam = url.searchParams.get("selectedRole");

    setReferrerId(referrerIdParam); // Referrer ID
    setCompanyId(companyIdParam); // Company ID for team invitation
    setSelectedRole(selectedRoleParam); // Selected role for team invitation

    if (companyIdParam) {
      setModalType("teamInvitation");
    } else {
      setModalType("referral");
    }

  }, []);

  if (!isMounted) return null; // Avoid rendering on the server

  return (
    <main className="w-full h-full bg-[#FAFAFA] bg-pattern bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      <nav className="mx-auto max-w-[42rem]">
        {modalType === "teamInvitation" ? (
          <>
            <h3 className="text-xl lg:text-3xl font-medium text-center mb-2 max-w-sm mx-auto">
              Collaborate on your talent needs
            </h3>
            <p className="text-center">
              In a world where talent makes a huge impact in any organization, involving everyone from every team to achieve your mission becomes critical.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-xl lg:text-3xl font-medium text-center mb-2">
              Someone thought you&apos;d<br /> like Clous
            </h3>
            <p className="text-center">
              “I&apos;m sure my friend in the People team would love this” — is what they probably thought. <br /><br />But don’t miss the chance to ask them… and take that chance to thank them too!
            </p>
          </>
        )}
      </nav>
      <div className="mx-auto max-w-[38rem] border p-4 rounded-3xl bg-[#FAFAFA] mt-8">
        <MainModal
          modalType={modalType as "teamInvitation" | "referral"}
          referrerId={referrerId ?? ""}
          companyId={companyId ?? ""}
        />
      </div>
      <SubstackLink linkUrl="https://substack.com/profile/14126-clous" linkText="Peer v2, our most powerful AI system for HR teams and operations." />
      <InfiniteLogoCarousel />
      <Footer />
    </main>
  );
}
