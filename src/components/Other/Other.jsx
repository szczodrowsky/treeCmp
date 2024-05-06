import styles from "./Other.module.css";
export function Other() {
  const checBoxValues = [
    {
      name: "Normalized distances",
      description: "",
      id: 1,
    },
    {
      name: "Prune trees",
      description: "",
      id: 2,
    },
    {
      name: "Include summary",
      description: "",
      id: 3,
    },
    {
      name: "Zero weights allowed",
      description: "",
      id: 4,
    },
    {
      name: "Bifurcating trees only",
      description: "",
      id: 5,
    },
  ];

  const OtherOptions = checBoxValues.map((option) => (
    <li key={option.id}>
      <input type="checkbox" id={option.id} />
      {option.name}
    </li>
  ));
  return (
    <>
      <div>
        <h3>Other Options</h3>
        <ul className={styles.list}>{OtherOptions}</ul>
      </div>
    </>
  );
}
