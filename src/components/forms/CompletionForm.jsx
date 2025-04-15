import React from "react";
import Button from "../ui/Button";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useFormContext } from "../../context/FormContext";

const PURPOSE_LABELS = {
  Housing: "to house ourselves",
  Worker: "to work for ourselves",
  Consumer: "to buy for ourselves",
  Financial: "to save money for ourselves"
};

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 12, fontFamily: 'Helvetica' },
  title: { fontSize: 20, fontWeight: 700, marginBottom: 28, textAlign: 'center' },
  certificateText: { marginBottom: 28, fontSize: 13, lineHeight: 1.6, textAlign: 'left' },
  sectionTitle: { fontSize: 14, fontWeight: 700, marginBottom: 8 },
  memberRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28, alignItems: 'flex-end' },
  signatureBox: { borderBottom: 1, width: 150, height: 24, marginRight: 12 },
  signatureDate: { borderBottom: 1, width: 80, height: 24 },
  label: { fontWeight: 700 },
});

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

const CoOpCertificatePDF = ({ formData }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const coopName = formData.initial?.coopName || "";
  const purpose = formData.initial?.purpose || "";
  const description = formData.initial?.description || "";
  const purposeLabel = PURPOSE_LABELS[purpose] || purpose;
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Certificate of Unincorporated Association</Text>
        <Text style={styles.certificateText}>
          This is to certify that the {purpose.toLowerCase()} co-operative:
          {"\n\n"}
          {coopName} {purposeLabel} Co-operative (Unincorporated)
          {"\n\n"}
          has been set up on {formattedDate}, by the undersigned parties, with the intent undertake the following activity:
          {"\n\n"}
          {description}
        </Text>
        <Text style={styles.sectionTitle}>Members</Text>
        {formData.members?.map((m, i) => (
          <View style={styles.memberRow} key={i}>
            <Text>{m.fullName} ({m.role})</Text>
            <Text>{m.email} {m.phone ? `| ${m.phone}` : ""}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Liability Statement</Text>
        <Text style={{ marginBottom: 28 }}>
          By signing this, the members understand that the co-operative has no limitation of liability, and that the members of the co-operative are responsible for all actions of the co-operative as their own actions.
        </Text>
        <Text style={styles.sectionTitle}>Signatures</Text>
        {formData.members?.map((m, i) => (
          <View style={styles.signatureRow} key={i}>
            <Text>{m.fullName} ({m.role})</Text>
            <View style={styles.signatureBox} />
            <Text>Date:</Text>
            <View style={styles.signatureDate} />
          </View>
        ))}
      </Page>
    </Document>
  );
};

const CompletionForm = ({ onBack, onComplete }) => {
  const { formData } = useFormContext();
  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-2" style={{ color: "#064c39" }}>
          Congratulations! You have set up an unincorporated co-operative
        </h1>
        <h2 className="text-lg font-semibold mb-2">What does 'unincorporated' mean?</h2>
        <p className="mb-4 text-sm text-gray-700">
          This allows you to work together on your project, and manage shared expenses, but it doesn't yet allow you to access most grant funding or banking services.{' '}
          <a href="https://www.uk.coop/start-new-co-op/start/choosing-incorporate" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">See more information here</a>.
        </p>
      </div>
      {/* PDF Download Card */}
      <div className="mb-8 p-6 rounded shadow" style={{ background: '#012d23' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-lg font-bold">Co-op Certificate</span>
          <PDFDownloadLink
            document={<CoOpCertificatePDF formData={formData} />}
            fileName={`Coop-Certificate-${formData.initial?.coopName || "cooperative"}.pdf`}
          >
            {({ loading }) => (
              <Button className="ml-4" style={{ background: '#d9ed0f', color: '#012d23' }}>
                {loading ? 'Preparing…' : 'Download'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
      <h2 className="text-lg font-bold mb-2">Information & Next Steps</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Should I incorporate?</h3>
        <p className="text-sm mb-2">Unincorporated associations are great for getting started, because they let you sign small contracts, pay and get paid, and define the group internally & externally. You will need to be incorporated to sign most contracts, including leases. It's worth getting started on that soon.</p>
        <a href="https://www.uk.coop/start-new-co-op/start/choosing-your-type-co-op" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Learn more at UK.coop</a>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Managing Money as an Unincorporated Association</h3>
        <ul className="text-sm list-disc ml-5 mb-2">
          <li>Treasurer should open a dedicated account. We recommend Monzo as it's easy to use and quick to set up.</li>
          <li>Keep detailed records and receipts, which can be claimed against any income of the UA without tax implications.</li>
          <li>Understand that an unincorporated association is not a separate legal entity, so there is no limitation of liability.</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Additional Resources</h3>
        <span className="text-sm">Housing Cooperatives can access finance, support, and a community at <a href="https://joinstead.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">joinstead.com</a>.</span>
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Back</Button>
      </div>
    </div>
  );
};

export default CompletionForm;
